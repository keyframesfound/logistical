import SwiftUI
import CoreImage.CIFilterBuiltins

struct QRCodeGeneratorView: View {
    @State private var inputText = ""
    @State private var qrImage: Image?
    
    let context = CIContext()
    let filter = CIFilter.qrCodeGenerator()
    
    var body: some View {
        VStack {
            TextField("Enter item data", text: $inputText)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            Button("Generate QR Code") {
                qrImage = generateQRCode(from: inputText)
            }
            .padding()
            if let qrImage = qrImage {
                qrImage
                    .resizable()
                    .interpolation(.none)
                    .scaledToFit()
                    .frame(width: 200, height: 200)
            }
        }
        .navigationTitle("QR Generator")
    }
    
    func generateQRCode(from string: String) -> Image? {
        filter.message = Data(string.utf8)
        if let outputImage = filter.outputImage,
           let cgimg = context.createCGImage(outputImage, from: outputImage.extent) {
            return Image(uiImage: UIImage(cgImage: cgimg))
        }
        return nil
    }
}

struct QRCodeGeneratorView_Previews: PreviewProvider {
    static var previews: some View {
        QRCodeGeneratorView()
    }
}