use tonic::{Request, Response, Status};

pub mod discount_tonic {
    tonic::include_proto!("discount");
}

pub use discount_tonic::discount_service_server::DiscountServiceServer;
pub use discount_tonic::{Discount, DiscountRequest};

use discount_tonic::discount_service_server::DiscountService;
use discount_tonic::DiscountResponse;

use crate::rules::black_friday::BlackFriday;
use crate::rules::user_birthday::UserBirthday;
use crate::rules::Rule;

const RULES: [&dyn Rule; 2] = [&BlackFriday, &UserBirthday];

#[derive(Debug, Default)]
pub struct DiscountGrpc {}

#[tonic::async_trait]
impl DiscountService for DiscountGrpc {
    async fn get_discount(
        &self,
        request: Request<DiscountRequest>,
    ) -> Result<Response<DiscountResponse>, Status> {
        println!("Request: {:?}", request);

        let discount = Discount::apply(&RULES, request.into_inner()).await;

        let response = DiscountResponse {
            discount: discount.into(),
        };

        Ok(Response::new(response))
    }
}
