use discount::ports::grpc::start_grpc_server;
use discount::ports::tonic::{DiscountServiceServer, HealthServiceServer};
use discount::services::discount::DiscountGrpc;
use discount::services::health_check::HealthCheckGrpc;
use dotenv::dotenv;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let discount_grpc = DiscountGrpc::default();
    let health_check_grpc = HealthCheckGrpc::default();

    start_grpc_server(
        HealthServiceServer::new(health_check_grpc),
        DiscountServiceServer::new(discount_grpc),
    )
    .await
}
