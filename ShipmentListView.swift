import SwiftUI

struct ShipmentListView: View {
    // Dummy shipments data
    let shipments: [Shipment] = [
        Shipment(id: UUID(), trackingNumber: "ABC123", status: "In Transit", origin: "New York, NY", destination: "Los Angeles, CA", estimatedDelivery: Date().addingTimeInterval(86400 * 3)),
        Shipment(id: UUID(), trackingNumber: "XYZ789", status: "Delivered", origin: "Chicago, IL", destination: "Houston, TX", estimatedDelivery: Date().addingTimeInterval(-86400))
    ]
    
    var body: some View {
        NavigationView {
            List(shipments) { shipment in
                NavigationLink(destination: ShipmentDetailView(shipment: shipment)) {
                    VStack(alignment: .leading) {
                        Text("Tracking: \(shipment.trackingNumber)")
                            .font(.headline)
                        Text("Status: \(shipment.status)")
                            .font(.subheadline)
                    }
                }
            }
            .navigationBarTitle("Shipments")
        }
    }
}

struct ShipmentListView_Previews: PreviewProvider {
    static var previews: some View {
        ShipmentListView()
    }
}
