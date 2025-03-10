import SwiftUI

struct InventoryListView: View {
    @EnvironmentObject var inventoryModel: InventoryModel
    
    var body: some View {
        NavigationView {
            List {
                ForEach(inventoryModel.items) { item in
                    VStack(alignment: .leading) {
                        Text(item.name)
                            .font(.headline)
                        Text("Scanned on \(item.dateScanned, formatter: itemFormatter)")
                            .font(.subheadline)
                    }
                }
                .onDelete(perform: deleteItems)
            }
            .navigationTitle("Inventory")
        }
    }
    
    func deleteItems(at offsets: IndexSet) {
        inventoryModel.items.remove(atOffsets: offsets)
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
