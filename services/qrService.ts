// Service to handle QR Code generation
// Documentation reference: https://qr.io/api-documentation

const QR_IO_API_KEY = process.env.QR_IO_API_KEY;

export const generateQrCode = async (text: string, color: string = '000000', name: string = 'TV Campaign'): Promise<string> => {
  const cleanColor = color.replace('#', '');
  const hexColor = `#${cleanColor}`;

  // 1. Try QR.IO if API Key is configured
  if (QR_IO_API_KEY && QR_IO_API_KEY !== 'PASTE_YOUR_KEY_HERE') {
    try {
      // payload matches "Example of QR Code with colors" structure
      const payload = {
        apikey: QR_IO_API_KEY,
        data: text,
        qrtype: 'dynamic', // Essential for Dashboard visibility
        title: name,
        transparent: 'on',
        // Colors must be hex
        frontcolor: hexColor, 
        marker_out_color: hexColor,
        marker_in_color: hexColor,
        // Standard defaults
        pattern: 'default',
        marker: 'default',
        marker_in: 'default',
        optionlogo: 'none'
      };

      console.log("Generating QR with payload:", payload);

      const response = await fetch('https://api.qr.io/v1/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const json = await response.json();
      console.log("QR.IO Response:", json);

      // Success checks based on typical API behavior
      if (json.qrcode) return json.qrcode;
      if (json.png) return json.png;
      if (json.data && json.data.qrcode) return json.data.qrcode;
      
    } catch (error) {
      console.error("QR.IO API Error:", error);
    }
  }

  // 2. Fallback to free generator if API fails or key missing
  console.log("Falling back to standard QR generator");
  return `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(text)}&color=${cleanColor}&bgcolor=ffffff`;
};