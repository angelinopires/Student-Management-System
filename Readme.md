## Problems
**Problem1** \
Fix "Add New Notice" Page \
<mark>/app/notices/add</mark> \
When click the 'Save' button, 'description' doesn't be saved. \
<b>Fix it.</b>

**Problem2** \
Complete CRUD operation in Student management page. \
<mark>/src/modules/students/students-controller.js</mark>

---

## Time tracking
I've tracked the tasks I've done with the approximate amount of time expended. 

- Understanding the project and its structure = 1h
- Complete setup with frontend, backend, and database up and running = 1h
- Solve problem 01 regarding description = 5m
  - I'm very familiar with Zod, so was very easy to find and fix it
- Solve problem 02 regarding students-controller = 2h30
  - It took way more than expected due the difficulty with debugging. Logs weren't being prompted in my Terminal
  - Because of that, I had to do a few upgrades as using Nodemon and Morgan to speed up the process
  - Also, I had to read and test the database function student_add_update, which helped to solve the problem I was having (id !== userId)

## Issues spotted
- Node version not enforced. I've added a `.nvmrc`
- `roll` field has some tricky validations. It accepts a number, but ZOD enforces a string
- Back-end has ZOD installed but is not actively using it. This makes developer's life complicated when you have to debug
  - Another issue with not using ZOD or TypeScript to enforce types is security. Both Students and Staff modules are receiving and passing a payload directly to the Database function `student_add_update` and `staff_add_update`
  - This pattern can bring serious issues to the product if malicious users get their hands on it
- Generic errors for most endpoints and services
  - Usually we can use a similar approach of `constants` folders, assigning an error code for each error and its message
  - That makes sit impler to i18n in the future, if that's the case
