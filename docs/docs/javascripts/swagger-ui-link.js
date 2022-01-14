window.onload = function() {
    const ui = SwaggerUIBundle({
      url: "http://127.0.0.1:8000/Api/swagger.yaml",
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ]
    })
  
    window.ui = ui
  }