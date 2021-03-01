use discount::ports::grpc;
use discount::ports::grpc::types::{DiscountServiceServer, HealthServiceServer};
use discount::services::discount::DiscountGrpc;
use discount::services::health_check::HealthCheckGrpc;
use dotenv::dotenv;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let discount_grpc = DiscountGrpc::default();
    let health_check_grpc = HealthCheckGrpc::default();

    grpc::server::start(
        HealthServiceServer::new(health_check_grpc),
        DiscountServiceServer::new(discount_grpc),
    )
    .await
}
