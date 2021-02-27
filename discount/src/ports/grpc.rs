use crate::grpc::{DiscountService, DiscountServiceServer};
use std::env;
use tonic::transport::Server;

pub async fn start_grpc_server<T: DiscountService>(
    service: DiscountServiceServer<T>,
) -> Result<(), Box<dyn std::error::Error>> {
    let address = format!("0.0.0.0:{}", env::var("GRPC_PORT")?).parse()?;

    Server::builder()
        .add_service(service)
        .serve(address)
        .await?;

    Ok(())
}
