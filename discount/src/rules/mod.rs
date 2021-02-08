use crate::grpc::{Discount, DiscountRequest};
use crate::math::clamp;

pub mod black_friday;

pub trait Rule {
    fn apply(&self, message: &DiscountRequest) -> f32;
}

impl Discount {
    pub fn apply(rules: &[&dyn Rule], message: DiscountRequest) -> Self {
        let percentage = rules.iter().fold(0.0, |acc, rule| match acc {
            percentage if percentage >= 10.0 => 10.0,
            percentage => percentage + rule.apply(&message),
        });

        Self {
            percentage: clamp(percentage, 10.0, percentage),
        }
    }
}

#[cfg(test)]
fn create_mock_discount_request() -> DiscountRequest {
    DiscountRequest {
        optional_user_id: None,
        product_id: "".into(),
    }
}

#[test]
fn discount_apply_stops_at_10() {
    struct Rule5;

    impl Rule for Rule5 {
        fn apply(&self, _message: &DiscountRequest) -> f32 {
            5.0
        }
    }

    struct Rule8;

    impl Rule for Rule8 {
        fn apply(&self, _message: &DiscountRequest) -> f32 {
            8.0
        }
    }

    struct Rule4;

    impl Rule for Rule4 {
        fn apply(&self, _message: &DiscountRequest) -> f32 {
            panic!("rule4 should not have been called");
        }
    }

    let rules: [&dyn Rule; 3] = [&Rule5, &Rule8, &Rule4];
    assert_eq!(
        Discount::apply(&rules, create_mock_discount_request()).percentage,
        10.0
    );
}

#[test]
fn discount_apply_less_than_10() {
    struct Rule5;

    impl Rule for Rule5 {
        fn apply(&self, _message: &DiscountRequest) -> f32 {
            5.0
        }
    }

    struct Rule4;

    impl Rule for Rule4 {
        fn apply(&self, _message: &DiscountRequest) -> f32 {
            4.0
        }
    }

    let rules: [&dyn Rule; 2] = [&Rule5, &Rule4];
    assert_eq!(
        Discount::apply(&rules, create_mock_discount_request()).percentage,
        9.0
    );
}

#[test]
fn discount_apply_passes_10_success() {
    struct Rule5;

    impl Rule for Rule5 {
        fn apply(&self, _message: &DiscountRequest) -> f32 {
            5.0
        }
    }

    struct Rule4;

    impl Rule for Rule4 {
        fn apply(&self, _message: &DiscountRequest) -> f32 {
            4.0
        }
    }

    struct Rule8;

    impl Rule for Rule8 {
        fn apply(&self, _message: &DiscountRequest) -> f32 {
            8.0
        }
    }

    let rules: [&dyn Rule; 3] = [&Rule5, &Rule4, &Rule8];
    assert_eq!(
        Discount::apply(&rules, create_mock_discount_request()).percentage,
        10.0
    );
}

#[test]
#[should_panic(expected = "rule8 should not have been called")]
fn discount_apply_passes_10_failure() {
    struct Rule5;

    impl Rule for Rule5 {
        fn apply(&self, _message: &DiscountRequest) -> f32 {
            5.0
        }
    }

    struct Rule4;

    impl Rule for Rule4 {
        fn apply(&self, _message: &DiscountRequest) -> f32 {
            4.0
        }
    }

    struct Rule8;

    impl Rule for Rule8 {
        fn apply(&self, _message: &DiscountRequest) -> f32 {
            panic!("rule8 should not have been called");
        }
    }

    let rules: [&dyn Rule; 3] = [&Rule5, &Rule4, &Rule8];
    assert_eq!(
        Discount::apply(&rules, create_mock_discount_request()).percentage,
        10.0
    );
}
