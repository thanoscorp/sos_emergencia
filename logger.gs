// Google Apps Script - Web App para registrar descargas de SOS Emergencia
// Instrucciones de despliegue:
// 1. Ve a https://script.google.com
// 2. Crea un nuevo proyecto
// 3. Pega este código
// 4. Ve a Implementar → Nuevo implementación → Tipo: Aplicación web
// 5. Acceso: "Cualquiera" (para permitir POST desde cualquier dominio)
// 6. Copia la URL del web app
// 7. Pégala en index.html donde dice WEBAPP_URL

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Abre o crea la hoja de cálculo
    var sheetName = "SOS_Descargas";
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      // Encabezados
      sheet.getRange(1, 1, 1, 8).setValues([[
        "Timestamp", "IP", "User-Agent", "Plataforma", 
        "Idioma", "Pantalla", "Ubicacion", "Referrer"
      ]]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
    }
    
    // Insertar fila
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.ip || "Desconocida",
      data.userAgent || "",
      data.platform || "",
      data.language || "",
      data.screen || "",
      data.location || "",
      data.referrer || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "ok",
      message: "Registro guardado"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "SOS Emergencia Logger - Usa POST para registrar descargas"
  })).setMimeType(ContentService.MimeType.JSON);
}
