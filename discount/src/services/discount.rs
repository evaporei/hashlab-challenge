use crate::ports::grpc::types::{Discount, DiscountRequest, DiscountResponse, DiscountService};
use crate::rules::black_friday::BlackFriday;
use crate::rules::user_birthday::UserBirthday;
use crate::rules::Rule;
use tonic::{Request, Response, Status};

const RULES: [&dyn Rule; 2] = [&BlackFriday, &UserBirthday];

#[derive(Debug, Default)]
pub struct DiscountGrpc {}

#[tonic::async_trait]
impl DiscountService for DiscountGrpc {
    async fn get_discount(
        &self,
        request: Request<DiscountRequest>,
    ) -> Result<Response<DiscountResponse>, Status> {
        let discount = Discount::apply(&RULES, request.into_inner()).await;

        let response = DiscountResponse {
            discount: discount.into(),
        };

        Ok(Response::new(response))
    }
}
