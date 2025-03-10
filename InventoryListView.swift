import SwiftUI

struct InventoryListView: View {
    @EnvironmentObject var inventoryModel: InventoryModel
    
    var body: some View {
        NavigationView {
            List(inventoryModel.items) { item in
                VStack(alignment: .leading) {
                    Text(item.name)
                        .font(.headline)
                    Text("Scanned on \(item.dateScanned, formatter: itemFormatter)")
                        .font(.subheadline)
                }
            }
            .navigationTitle("Inventory")
        }
    }
}

private let itemFormatter: DateFormatter = {
    let formatter = DateFormatter()
    formatter.dateStyle = .short
    formatter.timeStyle = .short
    return formatter
}()

struct InventoryListView_Previews: PreviewProvider {
    static var previews: some View {
        InventoryListView()
            .environmentObject(InventoryModel())
    }
}
