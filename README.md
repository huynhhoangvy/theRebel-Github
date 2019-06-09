CoderSchool FTW - * THE REBEL GITHUB - GROUP PROJECT *

![image](/ss.png)

### This is a simple app written with Reactjs to get/post/put/patch issues and gists on Github with API.

Created with love by: 
KHOA DAM
ANH VIET
HUY NGUYEN
VY HOANG

View Demo online: https://admiring-yonath-7a4487.netlify.com  (not working)



## The following user stories are implemented 

1. The user can enter a repository in a search bar, click "search", and see the associated issues. The repository should be of the format owner/repo-name, e.g. facebook/react.
If the repository does not exist, the user should see a proper error message.
2. The user should be able to see the following information for each issue:
  ```
  Issue Title
  Number of the issue
  Owner of the Issue
  Owner Avatar
  How long ago the issue was created in a human-friendly format (e.g. 2 days ago)
  Body of the Issue
  Label - note the color as returned by the API.
  State of Issue (Open/Closed).
  ```
3. The user should be able to see multiple pages of results, by clicking a pagination control. <br>
3.1 There is also pagination feature in "list of repo" page. In additional, Pagination works perfectly with Routing and any actions. 
4. The user should be able to see the body of the issue rendered in markdown.  
5. The user should be able to create a new issue via a modal for the repository, by clicking on a "new issue" button. Clicking on this button will pop open a modal that asks for the requisite fields.
6. If there is an error creating the issue (for example, the user not supplying all required parameters), there should be a nice error message to the user.

- Optional User Stories

7. The user can see more details (including comments!) in a modal that's opened by clicking on the title of the issue. 
8. The user, upon opening this modal, can add a comment via a textarea at the bottom of the page.
9. The user, upon opening the modal, can close the issue. If the person does not have the appropriate access to close an issue, the user sees a nicely formatted error message.
10. The user can see reactions attached to each comment (Reactions API). <br>
10.1 - the user can see reactions attached to the issue in additional to each comment
11. The user can add reactions to a comment (API documentation).
12. The user should be able to see his last action's result (new issue, new comment, new reactions)
13. Input Fuzzy Matching: the user should be able to type in either https://github.com/facebook/react or facebook/react, BOTH should work.
14. Instead of using Modal to show issue, use React Router (link) to navigate to different URL issues/:issueId to display the full issue. Have the Back button to go back to the previous page (from the individual issue page).
15. The user should be able to see other user's public gists (all gists content) when using search Gist button.




## Time consumed:
- 72 hours

## Lessons learned:
- Syntax
- Organising app structure
- Styling in CSS and JSX
- using API
- Team work

