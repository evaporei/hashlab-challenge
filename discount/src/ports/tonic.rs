tonic::include_proto!("discount");
tonic::include_proto!("user");

pub use discount_service_server::{DiscountService, DiscountServiceServer};
pub use user_service_client::UserServiceClient;
