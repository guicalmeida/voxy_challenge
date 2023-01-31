User-Facing Data Table
======================

This project is a user-facing page that renders a table with a search box and various functions that make it easy for users to find data. The focus is on front-end code flexibility to ensure that many future requirements can be met without extensive re-coding.

Acceptance Criteria
-------------------

*   The table displays 6 columns with the following data structures:
    *   email ([something@somewhere.com](mailto:something@somewhere.com))
    *   first name (joe)
    *   last name (smith jr)
    *   primary group (important people)
    *   phone number (781-633-2222)
    *   hours studied (1000)
*   A search box is presented to the user
*   The user can find an email in the email data structure and a group in the group data structure
*   The user can determine which users have studied the most and the least.

Getting Started
---------------

To start the project, you can start both Angular and the node server in parallel with the command `npm run start-platform`. Or, if you prefer, you can start both independently with `npm run start-app` and `npm run start-server`.