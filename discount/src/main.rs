use discount::grpc::{DiscountGrpc, DiscountServiceServer};
use tonic::transport::Server;
use dotenv::dotenv;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let address = format!("0.0.0.0:{}", env::var("GRPC_PORT")?).parse()?;
    let discount_grpc = DiscountGrpc::default();

    Server::builder()
        .add_service(DiscountServiceServer::new(discount_grpc))
        .serve(address)
        .await?;

    Ok(())
}
