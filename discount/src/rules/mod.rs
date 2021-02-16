use crate::grpc::{Discount, DiscountRequest};
use crate::math::clamp;
use async_trait::async_trait;
use futures::stream::{self, StreamExt};

pub mod black_friday;
pub mod user_birthday;

#[async_trait]
pub trait Rule: Send + Sync {
    async fn apply(&self, message: &DiscountRequest) -> f32;
}

impl Discount {
    pub async fn apply(rules: &[&dyn Rule], message: DiscountRequest) -> Self {
        let (percentage, _) = stream::iter(rules.iter())
            .fold((0.0, message), |(acc, message), rule| async move {
                let acc = match acc {
                    percentage if percentage >= 10.0 => 10.0,
                    percentage => percentage + rule.apply(&message).await,
                };

                (acc, message)
            })
            .await;

        Self {
            percentage: clamp(percentage, 10.0, percentage),
        }
    }
}

#[cfg(test)]
macro_rules! aw {
    ($e:expr) => {
        tokio_test::block_on($e)
    };
}

#[cfg(test)]
fn create_mock_discount_request() -> DiscountRequest {
    DiscountRequest {
        user_id: "".into(),
        product_id: "".into(),
    }
}

#[test]
fn discount_apply_stops_at_10() {
    struct Rule5;

    #[async_trait]
    impl Rule for Rule5 {
        async fn apply(&self, _message: &DiscountRequest) -> f32 {
            5.0
        }
    }

    struct Rule8;

    #[async_trait]
    impl Rule for Rule8 {
        async fn apply(&self, _message: &DiscountRequest) -> f32 {
            8.0
        }
    }

    struct Rule4;

    #[async_trait]
    impl Rule for Rule4 {
        async fn apply(&self, _message: &DiscountRequest) -> f32 {
            panic!("rule4 should not have been called");
        }
    }

    let rules: [&dyn Rule; 3] = [&Rule5, &Rule8, &Rule4];
    assert_eq!(
        aw!(Discount::apply(&rules, create_mock_discount_request())).percentage,
        10.0
    );
}

#[test]
fn discount_apply_less_than_10() {
    struct Rule5;

    #[async_trait]
    impl Rule for Rule5 {
        async fn apply(&self, _message: &DiscountRequest) -> f32 {
            5.0
        }
    }

    struct Rule4;

    #[async_trait]
    impl Rule for Rule4 {
        async fn apply(&self, _message: &DiscountRequest) -> f32 {
            4.0
        }
    }

    let rules: [&dyn Rule; 2] = [&Rule5, &Rule4];
    assert_eq!(
        aw!(Discount::apply(&rules, create_mock_discount_request())).percentage,
        9.0
    );
}

#[test]
fn discount_apply_passes_10_success() {
    struct Rule5;

    #[async_trait]
    impl Rule for Rule5 {
        async fn apply(&self, _message: &DiscountRequest) -> f32 {
            5.0
        }
    }

    struct Rule4;

    #[async_trait]
    impl Rule for Rule4 {
        async fn apply(&self, _message: &DiscountRequest) -> f32 {
            4.0
        }
    }

    struct Rule8;

    #[async_trait]
    impl Rule for Rule8 {
        async fn apply(&self, _message: &DiscountRequest) -> f32 {
            8.0
        }
    }

    let rules: [&dyn Rule; 3] = [&Rule5, &Rule4, &Rule8];
    assert_eq!(
        aw!(Discount::apply(&rules, create_mock_discount_request())).percentage,
        10.0
    );
}

#[test]
#[should_panic(expected = "rule8 should not have been called")]
fn discount_apply_passes_10_failure() {
    struct Rule5;

    #[async_trait]
    impl Rule for Rule5 {
        async fn apply(&self, _message: &DiscountRequest) -> f32 {
            5.0
        }
    }

    struct Rule4;

    #[async_trait]
    impl Rule for Rule4 {
        async fn apply(&self, _message: &DiscountRequest) -> f32 {
            4.0
        }
    }

    struct Rule8;

    #[async_trait]
    impl Rule for Rule8 {
        async fn apply(&self, _message: &DiscountRequest) -> f32 {
            panic!("rule8 should not have been called");
        }
    }

    let rules: [&dyn Rule; 3] = [&Rule5, &Rule4, &Rule8];
    assert_eq!(
        aw!(Discount::apply(&rules, create_mock_discount_request())).percentage,
        10.0
    );
}
