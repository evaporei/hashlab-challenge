use crate::grpc::DiscountRequest;
use crate::rules::Rule;
use chrono::{Date, Datelike, Utc, TimeZone};

pub struct UserBirthday;

impl UserBirthday {
    fn is_user_birthday(today: Date<Utc>, user_birthday: Date<Utc>) -> bool {
        match (today.day() == user_birthday.day(), today.month() == user_birthday.month()) {
            (true, true) => true,
            _ => false,
        }
    }
}

impl Rule for UserBirthday {
    fn apply(&self, message: &DiscountRequest) -> f32 {
        match &message.user_id[..] {
            "" => 0.0,
            _ => {
                if UserBirthday::is_user_birthday(Utc::today(), Utc.ymd(2021, 2, 7)) {
                    return 5.0;
                }
                0.0
            }
        }
    }
}

#[test]
fn test_user_birthday() {
    assert!(UserBirthday::is_user_birthday(Utc.ymd(2021, 2, 7), Utc.ymd(2021, 2, 7)));
    assert!(UserBirthday::is_user_birthday(Utc.ymd(2020, 2, 7), Utc.ymd(2022, 2, 7)));
    assert!(!UserBirthday::is_user_birthday(Utc.ymd(2020, 2, 8), Utc.ymd(2020, 2, 7)));
    assert!(!UserBirthday::is_user_birthday(Utc.ymd(2020, 1, 7), Utc.ymd(2020, 2, 7)));
}
