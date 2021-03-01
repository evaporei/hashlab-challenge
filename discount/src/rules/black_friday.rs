use crate::ports::grpc::types::DiscountRequest;
use crate::rules::Rule;
use async_trait::async_trait;
use chrono::{Date, Datelike, Local};

const BLACK_FRIDAY_DAY: u32 = 25;
const BLACK_FRIDAY_MONTH: u32 = 11;

pub struct BlackFriday;

impl BlackFriday {
    fn is_black_friday(date: Date<Local>) -> bool {
        match (date.day(), date.month()) {
            (BLACK_FRIDAY_DAY, BLACK_FRIDAY_MONTH) => true,
            _ => false,
        }
    }
}

#[async_trait]
impl Rule for BlackFriday {
    async fn apply(&self, _message: &DiscountRequest) -> f32 {
        match Self::is_black_friday(Local::today()) {
            true => 10.0,
            false => 0.0,
        }
    }
}

#[cfg(test)]
use chrono::TimeZone;

#[test]
fn test_is_black_friday() {
    assert!(BlackFriday::is_black_friday(Local.ymd(
        2021,
        BLACK_FRIDAY_MONTH,
        BLACK_FRIDAY_DAY
    )));
    assert!(!BlackFriday::is_black_friday(Local.ymd(2021, 2, 7)));
}
