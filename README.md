# angular-example

An Angular UI (User Interface) CRUD (Create, Read, Update, Delete) web application.

This application provides CRUD capability utilizing the public [JSON Placeholder](https://jsonplaceholder.typicode.com/) API and displays the results in an Angular UI web application. The JSON Placeholder **post** resource is used to invoke the APIs via Angular's [HttpClient](https://angular.dev/guide/http).

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

## Background

This web application is a variation of my [javafx-example](https://github.com/ppaternostro/javafx-example) application and was created with [Angular Material](https://material.angular.dev/) components and uses the [Tailwind CSS](https://tailwindcss.com/) library for application layout and CSS styling. After cloning the project, ensure both [Node.js&reg; and NPM](https://nodejs.org/en/download) are installed. To pull in the project's dependencies, from a terminal window in the project's root folder, run

```bash
npm install
```

## Running the application

To start a local development server, from a terminal window in the project's root folder, run:

```bash
ng serve
```

or

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

![Main Screen](https://github.com/user-attachments/assets/2780e3ce-b936-4b21-88d6-a39aa37cd42e)

Searches are performed by numeric id or by the default which will retrieve all post objects when clicking on the **Search** button when **All** is selected from the **Search By** drop down list.

![Search By All](https://github.com/user-attachments/assets/5bad2293-2179-467e-8922-a3a3b84407ba)

All the table columns are sortable by clicking their respective column headers. Continuously clicking the column header cycles the sort direction. Note the down arrow icon in the **Id** column below.

![Id Column Sort](https://github.com/user-attachments/assets/8f1201ba-7adc-448a-bb0f-25fe4983c642)

The **Create** button is only enabled if a table row is selected.

![Row Selected](https://github.com/user-attachments/assets/1d8a5a5d-f415-46ba-8683-3679cf26971c)

The JSON Placeholder API's **create** (POST), **update** (PUT) and **delete** (DELETE) operations are faked and will not persist changes on the server side. The returned responses will reflect results as if the operations were actually persisted server side.

The only editable columns in the result table are the **Title** and **Body** columns. To initiate an edit, click on the **Action** column's **edit** icon of the desired row. Clicking the **edit** icon will change the **Title** and **Body** columns into editable text fields. Make any desired changes and click on the **Action** column's **save** icon to execute the PUT API and persist the change in the table's columns. To abort changes while in edit mode, click on the **Action** column's **cancel** icon.

Clicking on the **Action** column's **delete** icon removes a row from the table only after succesfully calling the HTTP
DELETE operation on the **post** resource.

![Edit Columns](https://github.com/user-attachments/assets/10c97318-c462-49a2-a73c-874636273e25)

Clicking on the **Create** button will display a data entry dialog box for creating a new post. The created post will be associated with the user id value of the currently selected row. The dialog's **User Id** text field will be pre-filled and disabled.

![Create Post Dialog](https://github.com/user-attachments/assets/d12b8b79-37c8-49f9-ab4c-c8311c724d36)

Since creating a new post is faked by the JSON Placeholder API, creating multiple posts produces the same post id for each newly created post. This isn't representative of an actual API call.

Another issue uncovered with the newly created posts occurs when editing the editable column (**Title** and **Body**) values. Editing those column values produces a _500 Internal Server Error_ response code when calling the PUT API. This issue was not listed in the JSON Placeholder API's [known issues](https://github.com/typicode/jsonplaceholder/issues) but I was able to reproduce the error when using [Postman](https://www.postman.com/) to execute the PUT API with a post id value of _101_ or greater. The below stack trace was produced in the Postman console window.

> TypeError: Cannot read properties of undefined (reading 'id')
> at update (/app/node_modules/json-server/lib/server/router/plural.js:262:24)
> at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
> at next (/app/node_modules/express/lib/router/route.js:137:13)
> at next (/app/node_modules/express/lib/router/route.js:131:14)
> at Route.dispatch (/app/node_modules/express/lib/router/route.js:112:3)
> at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
> at /app/node_modules/express/lib/router/index.js:281:22
> at param (/app/node_modules/express/lib/router/index.js:354:14)
> at param (/app/node_modules/express/lib/router/index.js:365:14)
> at Function.process_params (/app/node_modules/express/lib/router/index.js:410:3)

Despite the issues stemming from using the free, fake JSON Placeholder API, this application is illustrative of using Angular as your web UI.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

- [Install Tailwind CSS with Angular](https://tailwindcss.com/docs/installation/framework-guides/angular)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Angular Signals: Complete Guide](https://blog.angular-university.io/angular-signals/)
- [Angular @if: Complete Guide](https://blog.angular-university.io/angular-if/)
- [Angular Standalone Components: Complete Guide](https://blog.angular-university.io/angular-standalone-components/)
