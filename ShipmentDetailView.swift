import SwiftUI

struct ShipmentDetailView: View {
    let shipment: Shipment
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Tracking Number: \(shipment.trackingNumber)")
                .font(.title)
            Text("Status: \(shipment.status)")
                .font(.headline)
            Text("Origin: \(shipment.origin)")
            Text("Destination: \(shipment.destination)")
            Text("Estimated Delivery: \(shipment.estimatedDelivery, formatter: dateFormatter)")
            Spacer()
        }
        .padding()
        .navigationBarTitle("Shipment Details", displayMode: .inline)
    }
}

private let dateFormatter: DateFormatter = {
    let formatter = DateFormatter()
    formatter.dateStyle = .medium
    formatter.timeStyle = .none
    return formatter
}()

struct ShipmentDetailView_Previews: PreviewProvider {
    static var previews: some View {
        ShipmentDetailView(shipment: Shipment(id: UUID(), trackingNumber: "ABC123", status: "In Transit", origin: "New York, NY", destination: "Los Angeles, CA", estimatedDelivery: Date().addingTimeInterval(86400 * 3)))
    }
}
