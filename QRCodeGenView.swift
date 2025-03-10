import SwiftUI

struct QRCodeGenView: View {
    @State private var inputText: String = ""
    
    var body: some View {
        VStack {
            // Input for item information
            TextField("Enter item info", text: $inputText)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            // Button to generate QR Code
            Button(action: {
                // TODO: Add QR Code generation logic
            }) {
                Text("Generate QR Code")
            }
            .padding()
            // Placeholder QR Code display
            Rectangle()
                .fill(Color.gray)
                .frame(width: 200, height: 200)
                .overlay(Text("QR Code"))
        }
        .navigationTitle("QR Code Generator")
    }
}

struct QRCodeGenView_Previews: PreviewProvider {
    static var previews: some View {
        QRCodeGenView()
    }
}
