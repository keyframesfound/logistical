import Foundation

struct Shipment: Identifiable {
    let id: UUID
    let trackingNumber: String
    let status: String
    let origin: String
    let destination: String
    let estimatedDelivery: Date
}
