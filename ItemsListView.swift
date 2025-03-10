import SwiftUI

struct ItemsListView: View {
    struct Item: Identifiable {
        let id = UUID()
        let name: String
        let isBorrowed: Bool
    }
    
    let items: [Item] = [
        Item(name: "Item 1", isBorrowed: false),
        Item(name: "Item 2", isBorrowed: true)
        // ...more items...
    ]
    
    var body: some View {
        NavigationView {
            List(items) { item in
                HStack {
                    Text(item.name)
                    Spacer()
                    Text(item.isBorrowed ? "Borrowed" : "Available")
                        .foregroundColor(item.isBorrowed ? .red : .green)
                }
            }
            .navigationTitle("Items")
        }
    }
}

struct ItemsListView_Previews: PreviewProvider {
    static var previews: some View {
        ItemsListView()
    }
}
