use crate::grpc::DiscountRequest;
use crate::rules::Rule;
use chrono::{Date, Datelike, Utc};

const BLACK_FRIDAY_DAY: u32 = 25;
const BLACK_FRIDAY_MONTH: u32 = 11;

pub struct BlackFriday;

impl BlackFriday {
    fn is_black_friday(date: Date<Utc>) -> bool {
        match (date.day(), date.month()) {
            (BLACK_FRIDAY_DAY, BLACK_FRIDAY_MONTH) => true,
            _ => false,
        }
    }
}

impl Rule for BlackFriday {
    fn apply(&self, _message: &DiscountRequest) -> f32 {
        match Self::is_black_friday(Utc::today()) {
            true => 10.0,
            false => 0.0,
        }
    }
}

#[cfg(test)]
use chrono::TimeZone;

#[test]
fn test_is_black_friday() {
    assert!(BlackFriday::is_black_friday(Utc.ymd(
        2021,
        BLACK_FRIDAY_MONTH,
        BLACK_FRIDAY_DAY
    )));
    assert!(!BlackFriday::is_black_friday(Utc.ymd(2021, 2, 7)));
}
