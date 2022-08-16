"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var App_1 = require("./components/App");
var react_router_dom_1 = require("react-router-dom");
var client_1 = require("react-dom/client");
var material_1 = require("./styles/material");
var styles_1 = require("@mui/material/styles");
var CssBaseline_1 = require("@mui/material/CssBaseline");
var styles_2 = require("@mui/material/styles");
var themeLight = (0, styles_2.createTheme)({
    palette: {
        background: {
            "default": '#e4f0e2'
        }
    }
});
var themeDark = (0, styles_2.createTheme)({
    palette: {
        background: {
            "default": '#1A2027'
        },
        text: {
            primary: '#1A2027'
        }
    }
});
var rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Failed to find the root element');
}
var root = (0, client_1.createRoot)(rootElement);
var Item = (0, styles_1.styled)(material_1.Paper)(function (_a) {
    var theme = _a.theme;
    return (__assign(__assign({ backgroundColor: '#1A2027' }, theme.typography.body2), { padding: theme.spacing(1), textAlign: 'center', color: theme.palette.text.secondary }));
});
root.render(<styles_2.ThemeProvider theme={themeDark}>
    <CssBaseline_1["default"] />
    <material_1.Box>
      <material_1.Grid container>
        <material_1.Grid item xs={12} md={12}>
          <Item>
            <react_router_dom_1.BrowserRouter>
              <react_router_dom_1.Routes>
                <react_router_dom_1.Route path='*' element={<App_1["default"] />}/>
              </react_router_dom_1.Routes>
            </react_router_dom_1.BrowserRouter>
          </Item>
        </material_1.Grid>
      </material_1.Grid>
    </material_1.Box>
  </styles_2.ThemeProvider>);
