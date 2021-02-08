pub fn clamp(min: f32, max: f32, value: f32) -> f32 {
    if value < min {
        min
    } else if value > max {
        max
    } else {
        value
    }
}

#[test]
fn test_clamp() {
    assert_eq!(clamp(0.0, 10.0, -5.0), 0.0);
    assert_eq!(clamp(0.0, 10.0, 5.0), 5.0);
    assert_eq!(clamp(0.0, 10.0, 15.0), 10.0);
}
