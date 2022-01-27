window.onload = function() {
    const ui = SwaggerUIBundle({
      url: "/Api/swagger.yaml",
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ]
    })
    window.ui = ui
  }
