export const fakeCollectionData = {
  collectionName: "apple",
  data: [
    {
      created_at: "2018-07-26T22:19:59.41Z",
      title: "pink lady",
      item_id: "12e085af-556f-4a0f-9a5b-1da1e15c978c"
    },
    {
      created_at: "2018-07-18T15:48:03.282Z",
      title: "fuji",
      item_id: "5484471c-bde2-4de0-9d0e-06bd45f48bce"
    }
  ],
  columns: [
    { ColumnName: "item_id", ColumnType: "uuid", PK: true },
    { ColumnName: "created_at", ColumnType: "timestamp", PK: false },
    { ColumnName: "title", ColumnType: "string", PK: false }
  ]
};

export function collectionStub({
  collectionName,
  data,
  columns
} = fakeCollectionData) {
  cy.route({
    url: `api/v/2/collection/*/${collectionName}/columns`,
    response: columns
  }).as("collColumns");
  cy.route({
    url: `api/v/1/collection/*/${collectionName}?query=*`,
    response: {
      DATA: data,
      CURRENTPAGE: 1,
      NEXTPAGEURL: null,
      PREVPAGEURL: null,
      TOTAL: data.length
    }
  }).as("collFetch");
  cy.route({
    url: `api/v/2/collection/*/${collectionName}/count?query=*`,
    response: { count: data.length }
  }).as("collCount");
}

const blankPortal = {
  config: "{}",
  description: "",
  last_updated: "25 Feb 20 14:45 UTC",
  name: "test",
  namespace: "",
  permissions: 5,
  plugins: [],
  system_key: "fakeSysKey",
  type: "custom_v2"
};

export function visitStubbedPortal(portalConfig = blankPortal) {
  Cypress.on("window:before:load", win => {
    win.fetch = null;
    // cypress only stubs xhr requests
    // since we use a polyfill, removing fetch falls back to xhr
  });
  cy.server();
  cy.route("console-api/platformURL", {
    url: "https://fakePlatform.clearblade.com",
    messageUrl: "fakePlatform.clearblade.com",
    messagePort: "8904",
    messageTls: true,
    isEdge: false,
    logPortalJSErrors: false,
    logConsoleJSErrors: false
  });

  cy.route({
    method: "POST",
    url: "console-api/portal/init/anon",
    response: { systemKey: "fakeSysKey", userToken: "fakeUserToken" }
  });
  cy.route({
    url: "console-api/portal/decodeURL?**",
    response: { systemKey: "fakeSysKey" }
  }).as("decodeURL");
  cy.route({
    url: "/portal/*/api/v/2/portals/fakeSysKey/*",
    response: {}
  });
  cy.route("/api/v/2/portals/**", portalConfig).as("getConfig");
  cy.visit("https://staging.clearblade.com"); // attempt to help with loading same page
  cy.visit(
    `https://staging.clearblade.com/portal/?systemKey=fakeSysKey==&systemSecret=fakeSysSecret=&name=a&allowAnon=true`
  );
}
