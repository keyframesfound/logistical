import Foundation

class InventoryModel: ObservableObject {
    @Published var items: [InventoryItem] = []
}

struct InventoryItem: Identifiable {
    let id = UUID()
    let name: String
    let dateScanned: Date
}
