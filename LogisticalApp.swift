import SwiftUI

@main
struct LogisticalApp: App {
    @StateObject var inventoryModel = InventoryModel()
    
    var body: some Scene {
        WindowGroup {
            TabView {
                QRCodeGeneratorView()
                    .tabItem {
                        Image(systemName: "qrcode")
                        Text("Generate")
                    }
                QRCodeScannerView()
                    .tabItem {
                        Image(systemName: "camera.viewfinder")
                        Text("Scan")
                    }
                InventoryListView()
                    .tabItem {
                        Image(systemName: "list.bullet")
                        Text("Inventory")
                    }
            }
            .environmentObject(inventoryModel)
        }
    }
}
