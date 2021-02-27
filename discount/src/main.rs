use discount::grpc::{DiscountGrpc, DiscountServiceServer};
use tonic::transport::Server;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let address = "0.0.0.0:4000".parse()?;
    let discount_grpc = DiscountGrpc::default();

    Server::builder()
        .add_service(DiscountServiceServer::new(discount_grpc))
        .serve(address)
        .await?;

    Ok(())
}
