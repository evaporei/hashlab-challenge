tonic::include_proto!("discount");
tonic::include_proto!("user");
tonic::include_proto!("health_check");

pub use discount_service_server::{DiscountService, DiscountServiceServer};
pub use health_service_server::{HealthService, HealthServiceServer};
pub use user_service_client::UserServiceClient;
