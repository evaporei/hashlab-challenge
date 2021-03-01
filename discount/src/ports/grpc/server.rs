use crate::ports::grpc::types::{
    DiscountService, DiscountServiceServer, HealthService, HealthServiceServer,
};
use std::env;
use tonic::transport::Server;

pub async fn start<T: DiscountService, U: HealthService>(
    health_check_service: HealthServiceServer<U>,
    discount_service: DiscountServiceServer<T>,
) -> Result<(), Box<dyn std::error::Error>> {
    let address = format!("0.0.0.0:{}", env::var("GRPC_PORT")?).parse()?;

    Server::builder()
        .add_service(health_check_service)
        .add_service(discount_service)
        .serve(address)
        .await?;

    Ok(())
}
