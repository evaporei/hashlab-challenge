use crate::rules::Rule;
use crate::service::DiscountRequest;
use async_trait::async_trait;
use chrono::{Date, Datelike, Local, NaiveDate};
use std::env;
use user_tonic::user_service_client::UserServiceClient;
use user_tonic::{User, UserRequest, UserResponse};

pub mod user_tonic {
    tonic::include_proto!("user");
}

pub async fn get_user(id: &str) -> Result<Option<User>, Box<dyn std::error::Error>> {
    let mut client = UserServiceClient::connect(env::var("USER_SERVICE_HOST")?).await?;

    let request = tonic::Request::new(UserRequest { user_id: id.into() });

    let response: UserResponse = client.get_user(request).await?.into_inner();

    Ok(response.user)
}

pub struct UserBirthday;

impl UserBirthday {
    fn is_user_birthday(today: Date<Local>, user_birthday: NaiveDate) -> bool {
        match (
            today.day() == user_birthday.day(),
            today.month() == user_birthday.month(),
        ) {
            (true, true) => true,
            _ => false,
        }
    }
}

#[async_trait]
impl Rule for UserBirthday {
    async fn apply(&self, message: &DiscountRequest) -> f32 {
        match &message.user_id[..] {
            "" => 0.0,
            user_id => {
                if let Ok(Some(User { date_of_birth, .. })) = get_user(user_id).await {
                    let user_birthday = match NaiveDate::parse_from_str(&date_of_birth, "%Y-%m-%d")
                    {
                        Ok(date) => date,
                        Err(_) => return 0.0,
                    };

                    if UserBirthday::is_user_birthday(Local::today(), user_birthday) {
                        return 5.0;
                    }
                }
                0.0
            }
        }
    }
}

#[cfg(test)]
use chrono::TimeZone;

#[test]
fn test_user_birthday() {
    assert!(UserBirthday::is_user_birthday(
        Local.ymd(2021, 2, 7),
        NaiveDate::from_ymd(2021, 2, 7)
    ));
    assert!(UserBirthday::is_user_birthday(
        Local.ymd(2020, 2, 7),
        NaiveDate::from_ymd(2022, 2, 7)
    ));
    assert!(!UserBirthday::is_user_birthday(
        Local.ymd(2020, 2, 8),
        NaiveDate::from_ymd(2020, 2, 7)
    ));
    assert!(!UserBirthday::is_user_birthday(
        Local.ymd(2020, 1, 7),
        NaiveDate::from_ymd(2020, 2, 7)
    ));
}
