fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_build::compile_protos("../proto/discount.proto")?;
    tonic_build::compile_protos("../proto/user.proto")?;
    Ok(())
}
