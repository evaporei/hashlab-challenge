use tonic::{Request, Response, Status};

pub mod discount_tonic {
    tonic::include_proto!("discount");
}

pub use discount_tonic::discount_service_server::DiscountServiceServer;

use discount_tonic::discount_service_server::DiscountService;
use discount_tonic::{Discount, DiscountRequest, DiscountResponse};

#[derive(Debug, Default)]
pub struct DiscountGrpc {}

#[tonic::async_trait]
impl DiscountService for DiscountGrpc {
    async fn get_discount(
        &self,
        request: Request<DiscountRequest>,
    ) -> Result<Response<DiscountResponse>, Status> {
        println!("Request: {:?}", request);

        let response = DiscountResponse {
            discount: Discount {
                percentage: 4.2,
                value_in_cents: 42,
            }
            .into(),
        };

        Ok(Response::new(response))
    }
}
