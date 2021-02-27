use discount::ports::grpc::start_grpc_server;
use discount::ports::tonic::DiscountServiceServer;
use discount::service::DiscountGrpc;
use dotenv::dotenv;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let discount_grpc = DiscountGrpc::default();

    start_grpc_server(DiscountServiceServer::new(discount_grpc)).await
}
