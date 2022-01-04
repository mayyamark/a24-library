# A24 Library Frontend

## Project description

The backend part of the Library System, where the users can borrow and return books, rate them, write a review about a book they have borrowed, read all the reviews about a book and rate the reviews.

## Tech stack

This is a JavaScript application. The main packages, that are used are:

- Express JS
- Passport and Passport-JWT
- MariaDB
- Nodemon

## Directory Structure

```bash
server
├── src
│   ├── auth
│   │   └── **/*.js
│   ├── controllers
│   │   └── **/*.js
│   ├── data
│   │   └── **/*.js
│   ├── middlewares
│   │   └── **/*.js
│   ├── services
│   │   └── **/*.js
│   ├── user-logout-data
│   │   └── **/*.js
│   ├── validators
│   │   └── **/*.schema.js
│   ├── app.js
│   └── config.js
├── .dockerignore
├── .eslintrc.js
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

## Endpoints

### Users

1. **POST/api/users/** - _Registers a new user._
   <details>
   <summary>Click for more details</summary>
       - An example for a request body:

   ```json
   {
     "username": "new",
     "password": "1234"
   }
   ```

   - An example for a response:

   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJ1c2VybmFtZSI6ImFkbWluMiIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNjQxMjkyMzE1LCJleHAiOjE2NDEyOTU5MTV9.kR-7aSZe8Lc5RG6retn53CpMRxoQ3fhRcYFDoLNcVDM"
   }
   ```

   </details>

2. **POST/api/users/login** - _Logs in the user._

   <details>
   <summary>Click for more details</summary>
    - An example for a request body:

   ```json
   {
     "username": "admin",
     "password": "1234"
   }
   ```

   - An example for a response:

   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJ1c2VybmFtZSI6ImFkbWluMiIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNjQxMjkyMzE1LCJleHAiOjE2NDEyOTU5MTV9.kR-7aSZe8Lc5RG6retn53CpMRxoQ3fhRcYFDoLNcVDM"
   }
   ```

   </details>

3. **POST/api/users/logout** - _Logs out the user._
   <details>
   <summary>Click for more details</summary>

   - Requires a Bearer token.

   - Does not need a request body.

   - An example for a response:

   ```json
   {
     "message": "logged out"
   }
   ```

   </details>

4. **GET/api/users/reviews** - _Gets all the reviews by this user._
   <details>
   <summary>Click for more details</summary>

   - Requires a Bearer token.

   - An example for a response:

   ```json
   {
     "reviews": [
       {
         "id": 4,
         "text": "This is my favourite book!",
         "bookId": 1,
         "bookName": "Pippi Longstocking",
         "bookImage": "https://upload.wikimedia.org/wikipedia/en/7/78/L%C3%A5ngstrump_G%C3%A5r_Ombord.jpeg"
       },
       {
         "id": 5,
         "text": "Not bad!!",
         "bookId": 2,
         "bookName": "Order of the Phoenix",
         "bookImage": "https://upload.wikimedia.org/wikipedia/en/7/70/Harry_Potter_and_the_Order_of_the_Phoenix.jpg"
       },
       {
         "id": 7,
         "text": "Like!",
         "bookId": 8,
         "bookName": "Murder on the Orient Express",
         "bookImage": "https://images-na.ssl-images-amazon.com/images/I/51+2QZIRWfL.jpg"
       },
       {
         "id": 9,
         "text": "Cool!",
         "bookId": 9,
         "bookName": "Death on the Nile",
         "bookImage": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSDcfTPH66LY9LlgzSTdLfxvrb3beajgWfxJlf_PxMNCtCQZyRm"
       },
       {
         "id": 10,
         "text": "Can't wait to read it!",
         "bookId": 10,
         "bookName": "The A.B.C. Murders",
         "bookImage": "https://agathachristie.imgix.net/hcuk-paperback/The-ABC-Murders.JPG?auto=compress,format&fit=clip&q=65&w=400"
       },
       {
         "id": 11,
         "text": "Wow!",
         "bookId": 14,
         "bookName": "The Picture of Dorian Gray",
         "bookImage": "https://www.prestwickhouse.com/ProductImages/ebeb01f5-41da-4f9b-a6cc-763c1610ccff/images/202121.jpg"
       },
       {
         "id": 12,
         "text": "Nice",
         "bookId": 13,
         "bookName": "The Tragedy of Puddâ€™nhead Wilson",
         "bookImage": "https://kbimages1-a.akamaihd.net/12f0eeab-2378-4703-9f6e-a254be0a7336/353/569/90/False/the-tragedy-of-pudd-nhead-wilson-18.jpg"
       },
       {
         "id": 15,
         "text": "Amaizing!",
         "bookId": 30,
         "bookName": "How Things Work : See Inside",
         "bookImage": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/7460/9780746098516.jpg"
       },
       {
         "id": 16,
         "text": "Me gusta!",
         "bookId": 32,
         "bookName": "The Deep End",
         "bookImage": "https://images-na.ssl-images-amazon.com/images/I/51x8WaTt84L._SX339_BO1,204,203,200_.jpg"
       },
       {
         "id": 17,
         "text": "Nice!",
         "bookId": 29,
         "bookName": "All Our Shimmering Skies",
         "bookImage": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4607/9781460753903.jpg"
       },
       {
         "id": 18,
         "text": "Wooooooooooow!",
         "bookId": 31,
         "bookName": "Untamed",
         "bookImage": "https://images-na.ssl-images-amazon.com/images/I/51m7MVU4OWL._SX329_BO1,204,203,200_.jpg"
       },
       {
         "id": 19,
         "text": "Awesome!",
         "bookId": 6,
         "bookName": "The Brothers Lionheart",
         "bookImage": "https://upload.wikimedia.org/wikipedia/en/5/5a/Lionheart_brothers.jpg"
       },
       {
         "id": 20,
         "text": "The best book ever!",
         "bookId": 7,
         "bookName": "Christmas in Noisy Village",
         "bookImage": "https://bethlehembooks.com/sites/default/files/HappyTimesInNoisyVillage.jpg"
       },
       {
         "id": 21,
         "text": "Cool!",
         "bookId": 35,
         "bookName": "A Time for Mercy",
         "bookImage": "https://images-na.ssl-images-amazon.com/images/I/51Q4FT2AIfL._SX327_BO1,204,203,200_.jpg"
       },
       {
         "id": 23,
         "text": "I cried while reading!",
         "bookId": 4,
         "bookName": "Romeo and Juliet ",
         "bookImage": "https://prodimage.images-bn.com/pimages/9780743477116_p0_v2_s1200x630.jpg"
       }
     ]
   }
   ```

   </details>

### Books

All of these endpoints require a Bearer token.

1.  **GET/api/books** - _Gets all of the not-hidden books with optional query parameters._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.

    - Optional query params:
      - name - partial book name
      - author - partial author name
      - genre - one of: _fiction_, _criminal_, _fantasy_, _novel_, _tragedy_, _children's literature_, _biography_, _self-help_
      - page - page number
      - limit - results per page
    - An example: `GET/api/books?page=1&limit=2&name=a&author=a&genre=fiction`

    - An example for a response:

    ```json
    {
      "books": [
        {
          "bookId": 6,
          "name": "The Brothers Lionheart",
          "image": "https://upload.wikimedia.org/wikipedia/en/5/5a/Lionheart_brothers.jpg",
          "description": "It is a story of optimism - a story that clearly tells that there is life beyond that, and a very interesting and eventful life at that. To cut a long story short, The Brothers Lionheart is a story about Karl, a 10 year old who is suffering from a terminal illness, and his 13 year old brother Jonatan.",
          "author": "Astrid Lindgren",
          "genre": "fiction",
          "status": "free"
        },
        {
          "bookId": 7,
          "name": "Christmas in Noisy Village",
          "image": "https://bethlehembooks.com/sites/default/files/HappyTimesInNoisyVillage.jpg",
          "description": "Let the beloved author of Pippi Longstocking take you on an adventure to Noisy Village! The noisy children of three neighboring families are celebrating the season by baking cookies, cutting and decorating trees, eating fruitcake and tarts, and opening Christmas gifts. With illustrations by Ilon Wikland, the master storyteller Astrid Lindgren takes us through Christmas in the Noisy Village!",
          "author": "Astrid Lindgren",
          "genre": "fiction",
          "status": "borrowed"
        }
      ],
      "currentPage": 1,
      "bookCount": 8,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
    ```

    </details>

1.  **GET/api/books/history** - _Gets the history for the given user._
       <details>
       <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example for a response:

    ```json
    [
      {
        "id": 9,
        "bookId": 1,
        "name": "Pippi Longstocking",
        "borrowed": "24 Oct 2020 at 14:44:52",
        "returned": "24 Oct 2020 at 14:44:57"
      },
      {
        "id": 10,
        "bookId": 8,
        "name": "Murder on the Orient Express",
        "borrowed": "24 Oct 2020 at 14:55:06",
        "returned": "24 Oct 2020 at 14:55:10"
      },
      {
        "id": 11,
        "bookId": 29,
        "name": "All Our Shimmering Skies",
        "borrowed": "24 Oct 2020 at 14:55:54",
        "returned": "24 Oct 2020 at 14:55:59"
      },
      {
        "id": 12,
        "bookId": 31,
        "name": "Untamed",
        "borrowed": "24 Oct 2020 at 14:56:55",
        "returned": "24 Oct 2020 at 14:56:59"
      },
      {
        "id": 13,
        "bookId": 5,
        "name": "Hamlet",
        "borrowed": "24 Oct 2020 at 19:16:21",
        "returned": "24 Oct 2020 at 19:16:29"
      },
      {
        "id": 14,
        "bookId": 3,
        "name": "The Mysterious Affair at Styles",
        "borrowed": "24 Oct 2020 at 19:19:32",
        "returned": "24 Oct 2020 at 19:19:38"
      },
      {
        "id": 15,
        "bookId": 1,
        "name": "Pippi Longstocking",
        "borrowed": "25 Oct 2020 at 20:36:39",
        "returned": "25 Oct 2020 at 20:36:56"
      },
      {
        "id": 16,
        "bookId": 5,
        "name": "Hamlet",
        "borrowed": "25 Oct 2020 at 20:37:17",
        "returned": "25 Oct 2020 at 20:38:01"
      },
      {
        "id": 17,
        "bookId": 1,
        "name": "Pippi Longstocking",
        "borrowed": "25 Oct 2020 at 20:37:45",
        "returned": "25 Oct 2020 at 20:37:57"
      },
      {
        "id": 18,
        "bookId": 1,
        "name": "Pippi Longstocking",
        "borrowed": "26 Oct 2020 at 09:40:51",
        "returned": "26 Oct 2020 at 09:41:01"
      },
      {
        "id": 19,
        "bookId": 4,
        "name": "Romeo and Juliet ",
        "borrowed": "26 Oct 2020 at 13:53:56",
        "returned": "26 Oct 2020 at 13:54:02"
      },
      {
        "id": 20,
        "bookId": 1,
        "name": "Pippi Longstocking",
        "borrowed": "26 Oct 2020 at 16:10:09",
        "returned": "26 Oct 2020 at 16:10:15"
      },
      {
        "id": 21,
        "bookId": 35,
        "name": "A Time for Mercy",
        "borrowed": "26 Oct 2020 at 16:55:09",
        "returned": "26 Oct 2020 at 16:55:50"
      },
      {
        "id": 23,
        "bookId": 2,
        "name": "Order of the Phoenix",
        "borrowed": "26 Oct 2020 at 20:06:57",
        "returned": "26 Oct 2020 at 20:07:02"
      },
      {
        "id": 24,
        "bookId": 4,
        "name": "Romeo and Juliet ",
        "borrowed": "27 Oct 2020 at 13:37:54",
        "returned": "27 Oct 2020 at 13:38:01"
      },
      {
        "id": 25,
        "bookId": 27,
        "name": "Practise with Peppa: Wipe-Clean First Numbers",
        "borrowed": "27 Oct 2020 at 14:19:30",
        "returned": "27 Oct 2020 at 14:19:52"
      },
      {
        "id": 26,
        "bookId": 27,
        "name": "Practise with Peppa: Wipe-Clean First Numbers",
        "borrowed": "27 Oct 2020 at 14:20:04",
        "returned": "27 Oct 2020 at 14:21:13"
      },
      {
        "id": 27,
        "bookId": 27,
        "name": "Practise with Peppa: Wipe-Clean First Numbers",
        "borrowed": "27 Oct 2020 at 14:21:31",
        "returned": "27 Oct 2020 at 14:25:09"
      },
      {
        "id": 28,
        "bookId": 1,
        "name": "Pippi Longstocking",
        "borrowed": "27 Oct 2020 at 14:24:55",
        "returned": "27 Oct 2020 at 14:25:06"
      },
      {
        "id": 29,
        "bookId": 3,
        "name": "The Mysterious Affair at Styles",
        "borrowed": "28 Oct 2020 at 15:30:56",
        "returned": "28 Oct 2020 at 15:31:07"
      },
      {
        "id": 30,
        "bookId": 4,
        "name": "Romeo and Juliet ",
        "borrowed": "30 Oct 2020 at 09:20:52",
        "returned": "30 Oct 2020 at 09:20:58"
      },
      {
        "id": 31,
        "bookId": 1,
        "name": "Pippi Longstocking",
        "borrowed": "30 Oct 2020 at 10:02:06",
        "returned": "30 Oct 2020 at 10:02:23"
      },
      {
        "id": 32,
        "bookId": 1,
        "name": "Pippi Longstocking",
        "borrowed": "30 Oct 2020 at 16:16:32",
        "returned": "30 Oct 2020 at 16:16:41"
      }
    ]
    ```

       </details>

1.  **DELETE/api/books/:id** - _Updates the book's status to 'free' and logs that update into the history._
       <details>
       <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `DELETE/api/books/1`

    - Required request body (`status_id` === 1 means that the book is "free"):

    ```json
    {
      "status_id": 1
    }
    ```

    - An example for a response:

    ```json
    {
      "successMessage": "Successfully returned book with id 1!",
      "book": {
        "bookId": 1,
        "name": "Pippi Longstocking",
        "image": "https://upload.wikimedia.org/wikipedia/en/7/78/L%C3%A5ngstrump_G%C3%A5r_Ombord.jpeg",
        "description": "The beloved story of a spunky young girl and her hilarious escapades. \"A rollicking story.\"--The Horn Book Tommy and his sister Annika have a new neighbor, and her name is Pippi Longstocking. She has crazy red pigtails, no parents to tell her what to do, a horse that lives on her porch, and a flair for the outrageous that seems to lead to one adventure after another!",
        "author": "Astrid Lindgren",
        "genre": "fiction",
        "status": "borrowed",
        "isDeleted": 0
      },
      "borrowDate": "2022-01-04T11:02:51.000Z"
    }
    ```

       </details>

1.  **GET/api/books/:id** - _Gets a single not-hidden book by its id._
       <details>
       <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `GET/api/books/1`

    - An example for a response:

    ```json
    {
      "bookId": 1,
      "name": "Pippi Longstocking",
      "image": "https://upload.wikimedia.org/wikipedia/en/7/78/L%C3%A5ngstrump_G%C3%A5r_Ombord.jpeg",
      "description": "The beloved story of a spunky young girl and her hilarious escapades. \"A rollicking story.\"--The Horn Book Tommy and his sister Annika have a new neighbor, and her name is Pippi Longstocking. She has crazy red pigtails, no parents to tell her what to do, a horse that lives on her porch, and a flair for the outrageous that seems to lead to one adventure after another!",
      "author": "Astrid Lindgren",
      "genre": "fiction",
      "status": "free",
      "averageRate": 4
    }
    ```

       </details>

1.  **PUT/api/books/:id** - _Updates the book's status to 'borrowed' and logs that update into the history._
       <details>
       <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `PUT/api/books/1`

    - Required request body (`status_id` === 2 means that the book is "borrowed"):

    ```json
    {
      "status_id": 2
    }
    ```

    - An example for a response:

    ```json
    {
      "successMessage": "Successfully borrowed book with id 1!",
      "book": {
        "bookId": 1,
        "name": "Pippi Longstocking",
        "image": "https://upload.wikimedia.org/wikipedia/en/7/78/L%C3%A5ngstrump_G%C3%A5r_Ombord.jpeg",
        "description": "The beloved story of a spunky young girl and her hilarious escapades. \"A rollicking story.\"--The Horn Book Tommy and his sister Annika have a new neighbor, and her name is Pippi Longstocking. She has crazy red pigtails, no parents to tell her what to do, a horse that lives on her porch, and a flair for the outrageous that seems to lead to one adventure after another!",
        "author": "Astrid Lindgren",
        "genre": "fiction",
        "status": "borrowed",
        "isDeleted": 0
      },
      "borrowDate": "2022-01-04T11:02:51.000Z"
    }
    ```

       </details>

1.  **POST/api/books/:id/rate** - _Adds a new rate for the book._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `GET/api/books/1/rate`

    - An example for a request body (rate is a number from 1 to 5):

    ```json
    {
      "rate": 5
    }
    ```

    - An example for a response:

    ```json
    {
      "book": {
        "bookId": 1,
        "name": "Pippi Longstocking",
        "image": "https://upload.wikimedia.org/wikipedia/en/7/78/L%C3%A5ngstrump_G%C3%A5r_Ombord.jpeg",
        "description": "The beloved story of a spunky young girl and her hilarious escapades. \"A rollicking story.\"--The Horn Book Tommy and his sister Annika have a new neighbor, and her name is Pippi Longstocking. She has crazy red pigtails, no parents to tell her what to do, a horse that lives on her porch, and a flair for the outrageous that seems to lead to one adventure after another!",
        "author": "Astrid Lindgren",
        "genre": "fiction",
        "status": "free"
      },
      "averageRate": 5,
      "newRate": 5
    }
    ```

    </details>

### Book reviews

All of these endpoints require a Bearer token.

1.  **GET/api/books/:id/reviews** - _Gets all of the not-deleted reviews for the given book._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `GET/api/books/2/reviews`

    - An example for a response:

      ```json
      {
        "book": {
          "bookId": 2,
          "name": "Order of the Phoenix",
          "image": "https://upload.wikimedia.org/wikipedia/en/7/70/Harry_Potter_and_the_Order_of_the_Phoenix.jpg",
          "description": "Rowling and the fifth novel in the Harry Potter series. It follows Harry Potter's struggles through his fifth year at Hogwarts School of Witchcraft and Wizardry, including the surreptitious return of the antagonist Lord Voldemort, O.W.L. exams, and an obstructive Ministry of Magic.",
          "author": "Joanne Rowling",
          "genre": "fantasy",
          "status": "free"
        },
        "reviews": [
          {
            "bookId": 2,
            "reviewId": 5,
            "text": "Not bad!!",
            "user": "admin",
            "userId": 1,
            "likes": 0,
            "dislikes": 0
          }
        ]
      }
      ```

</details>

1.  **POST/api/books/:id/reviews** - _Adds a new review to the given book._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `POST/api/books/23/reviews`

    - An example for a request body:

      ```json
      {
        "text": "Awesomeeee!!"
      }
      ```

    - An example for a response:
      ````json
        {
          "book": {
            "bookId": 2,
            "name": "Order of the Phoenix",
            "image": "https://upload.wikimedia.org/wikipedia/en/7/70/Harry_Potter_and_the_Order_of_the_Phoenix.jpg",
            "description": "Rowling and the fifth novel in the Harry Potter series. It follows Harry Potter's struggles through his fifth year at Hogwarts School of Witchcraft and Wizardry, including the surreptitious return of the antagonist Lord Voldemort, O.W.L. exams, and an obstructive Ministry of Magic.",
            "author": "Joanne Rowling",
            "genre": "fantasy",
            "status": "free"
          },
          "reviews": [
            {
              "bookId": 2,
              "reviewId": 5,
              "text": "Not bad!!",
              "user": "admin",
              "userId": 1,
              "likes": 0,
              "dislikes": 0
            }
          ]
        }
        ```
      ````

</details>

1.  **PUT/api/books/:id/reviews/:reviewId** - _Updates the given review only if the author is the authorized user._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `PUT/api/books/23/reviews/26`

    - An example for a request body:

    ```json
    {
      "text": "WOWwwww!!"
    }
    ```

    - An example for a response:

    ```json
    {
      "message": "Review updated!",
      "text": "WOWwwww!!"
    }
    ```

    </details>

1.  **DELETE/api/books/:id/reviews/:reviewId** - _Deletes the given review only if the author is the authorized user._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `DELETE/api/books/23/reviews/26`

    - Does not need a request body:

    - An example for a response:

    ```json
    {
      "message": "Review deleted!"
    }
    ```

    </details>

1.  **PUT/api/books//:id/reviews/:reviewId/votes** - _Adds or updates the given review's vote only if the voter is not the author of the review._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `PUT/api/books/4/reviews/24/votes`

    - An example for a request body:

    ```json
    {
      "vote": "like"
    }
    ```

    - An example for a response:

    ```json
    {
      "successMessage": "Successfully voted for review with id 24!",
      "review": {
        "review_id": 24,
        "book_id": 4,
        "user_id": 3,
        "text": "When can I borrow it?",
        "is_deleted": 0
      },
      "votes": {
        "reviewId": 24,
        "likes": 1,
        "dislikes": 0
      },
      "text": "like"
    }
    ```

    </details>

### Admins

All of these endpoints need a Requires token. The user has to be an admin.

#### Manipulate users

1.  **POST/api/admin/users/:id/banstatus** - _Bans the given user._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role.

    - An example: `POST/api/admin/users/2/banstatus`

    - An example for a request body:

      ```json
      {
        "description": "banned by admin admin",
        "is_banned": true
      }
      ```

    - An example for a response:

      ```json
      {
        "description": "banned by admin admin",
        "is_banned": true,
        "user": "nadya"
      }
      ```

    </details>

1.  **POST/api/admin/users/:id/role** - Changes the role of the given user.\_
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role.

    - An example: `POST/api/admin/users/7/role`

    - An example for a request body (role is "Admin" or "User"):

      ```json
      {
        "role": "Admin"
      }
      ```

    </details>

1.  **DELETE/api/admin/users/:id** - _Deletes the given user._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role

    - An example: `DELETE/api/admin/users/6`

    - Does not need a request body

    - An example for a response:

      ```json
      {
        "message": "deleted successfully!",
        "user": {
          "user_id": 6,
          "username": "sasho",
          "password": "$2b$10$8pk.8mJRFC58Efy0rIMvruUlET1udOWbsh9EYtOONysb1blwWK/dK",
          "ban_status_id": 1,
          "is_admin": 0
        }
      }
      ```

    </details>

#### Manipulate books

1.  **GET/api/admin/books** - _Gets all books with optional query parameters._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role.

    - Optional query params:

      - name - partial book name
      - author - partial author name
      - genre - one of: _fiction_, _criminal_, _fantasy_, _novel_, _tragedy_, _children's literature_, _biography_, _self-help_
      - page - page number
      - limit - results per page

    - An example: `GET/api/admin/books?page=1&limit=2&name=a&author=a&genre=fiction`

    - An example for a response:

    ```json
    {
      "books": [
        {
          "bookId": 6,
          "name": "The Brothers Lionheart",
          "image": "https://upload.wikimedia.org/wikipedia/en/5/5a/Lionheart_brothers.jpg",
          "description": "It is a story of optimism - a story that clearly tells that there is life beyond that, and a very interesting and eventful life at that. To cut a long story short, The Brothers Lionheart is a story about Karl, a 10 year old who is suffering from a terminal illness, and his 13 year old brother Jonatan.",
          "author": "Astrid Lindgren",
          "genre": "fiction",
          "status": "free",
          "isDeleted": 0
        },
        {
          "bookId": 7,
          "name": "Christmas in Noisy Village",
          "image": "https://bethlehembooks.com/sites/default/files/HappyTimesInNoisyVillage.jpg",
          "description": "Let the beloved author of Pippi Longstocking take you on an adventure to Noisy Village! The noisy children of three neighboring families are celebrating the season by baking cookies, cutting and decorating trees, eating fruitcake and tarts, and opening Christmas gifts. With illustrations by Ilon Wikland, the master storyteller Astrid Lindgren takes us through Christmas in the Noisy Village!",
          "author": "Astrid Lindgren",
          "genre": "fiction",
          "status": "borrowed",
          "isDeleted": 0
        }
      ],
      "currentPage": 1,
      "bookCount": 9,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
    ```

    </details>

1.  **GET/api/admin/books/:id** - _Gets a single book by its id._
       <details>
       <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role.

    - An example: `GET/api/admin/books/28`

    - An example for a response:

    ```json
    {
      "bookId": 28,
      "name": "Practise with Peppa: Wipe-Clean First Letters",
      "image": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/7232/9780723292081.jpg",
      "description": "Develop and practise first letter shapes with Peppa Pig and friends in this colourful wipe-clean activity book! Trace over the lowercase letters from a-z and learn new words through a range of fun Peppa-themed activities. Ideal for young readers who are starting school and learning to write first letter shapes, this book helps children form letters in the correct way with extra guidance for left-handers. Children can wipe the page clean each time and practise again and again. Also includes a free pen.",
      "author": "Peppa Pig",
      "genre": "fiction",
      "status": "free",
      "isDeleted": 1,
      "averageRate": 0
    }
    ```

       </details>

1.  **POST/api/admin/books** - _Creates a book._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role.

    - An example for a request body:

      ```json
      {
        "name": "The Goose Egg",
        "image": "https://images-na.ssl-images-amazon.com/images/I/51A%2B8tZvLXL._SX218_BO1,204,203,200_QL40_ML2_.jpg",
        "description": "Henrietta likes her quiet life. A morning swim, a cup of tea--all is serene. But everything changes when she bumps her head and winds up with a goose egg--a REAL goose egg. Henrietta tries to return the baby goose to the nest, but her flock has flown. It's up to Henrietta to raise her.",
        "authorFirstName": "Liz ",
        "authorLastName": "Wong",
        "genre": "children's literature",
        "status_id": 2
      }
      ```

    - An example for a response:

      ```json
      {
        "successMessage": "Successfully created book The Goose Egg!",
        "book": {
          "bookId": 46,
          "name": "The Goose Eggs",
          "image": "https://images-na.ssl-images-amazon.com/images/I/51A%2B8tZvLXL._SX218_BO1,204,203,200_QL40_ML2_.jpg",
          "description": "Henrietta likes her quiet life. A morning swim, a cup of tea--all is serene. But everything changes when she bumps her head and winds up with a goose egg--a REAL goose egg. Henrietta tries to return the baby goose to the nest, but her flock has flown. It's up to Henrietta to raise her.",
          "author": "Liz  Wong",
          "genre": "children's literature",
          "status": "borrowed",
          "isDeleted": 0
        }
      }
      ```

    </details>

1.  **PUT/api/admin/books/:id** - _Updates a book._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role.

    - An example: `GET/api/admin/books/1`

    - An example for a request body (status_id === 3 means that the book is unlisted):

    ```json
    {
      "status_id": 3
    }
    ```

    - An example for a response:

    ```json
    {
      "successMessage": "Successfully updated book with id 1!",
      "book": {
        "bookId": 1,
        "name": "Pippi Longstocking",
        "image": "https://upload.wikimedia.org/wikipedia/en/7/78/L%C3%A5ngstrump_G%C3%A5r_Ombord.jpeg",
        "description": "The beloved story of a spunky young girl and her hilarious escapades. \"A rollicking story.\"--The Horn Book Tommy and his sister Annika have a new neighbor, and her name is Pippi Longstocking. She has crazy red pigtails, no parents to tell her what to do, a horse that lives on her porch, and a flair for the outrageous that seems to lead to one adventure after another!",
        "author": "Astrid Lindgren",
        "genre": "fiction",
        "status": "unlisted",
        "isDeleted": 0
      },
      "updateData": {
        "status_id": 3
      }
    }
    ```

      </details>

1.  **DELETE/api/admin/books/:id** - _Hides the given book from non-admin users._
       <details>
       <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role.
    - An example: `DELETE/api/admin/books/19`

    - An example for a response:

    ```json
    {
      "successMessage": "Successfully removed book with id 19!",
      "book": {
        "bookId": 19,
        "name": "Eleven Minutes",
        "image": "https://m.media-amazon.com/images/I/51USI3nvZ2L.jpg",
        "description": "Eleven Minutes is the story of Maria, a young girl from a Brazilian village, whose first innocent brushes with love leave her heartbroken. ... Maria's despairing view of love is put to the test when she meets a handsome young painter",
        "author": "Paulo Coelho",
        "genre": "fiction",
        "status": "free"
      }
    }
    ```

       </details>

#### Manipulate book reviews

1.  **GET/api/admin/books/:id/reviews** - _Gets all of the not-deleted reviews for the given book._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role.

    - An example: `GET/api/admin/books/23/reviews`

    - Does not need a request body

    - An example for a response:

      ```json
      {
        "book": {
          "bookId": 23,
          "name": "Pig the Pug",
          "image": "https://c.booko.info/covers/a78b02febab074cb/v/600.jpeg",
          "description": "The story follows a day in the life of Pig (who is a rather selfish pug) and his play time with Trevor â€“ the cutest sausage dog you'll ever meet. All Trevor wants is one toy, but Pig refuses to share. As a poor Trevor's luck would have it, Pig goes into a toy-snatching frenzy and makes a rather large pile of toys.",
          "author": "Aaron Blabey",
          "genre": "fiction",
          "status": "free",
          "isDeleted": 0
        },
        "reviews": [
          {
            "bookId": 23,
            "reviewId": 26,
            "text": "WOWwwww!!",
            "user": "admin",
            "userId": 1,
            "isDeleted": 1,
            "likes": 0,
            "dislikes": 0
          }
        ]
      }
      ```

</details>

1.  **POST/api/admin/books/:id/reviews** - _Adds a new review to the given book._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role.

    - An example: `POST/api/admin/books/23/reviews`

    - An example for a request body:

      ```json
      {
        "text": "mamamia"
      }
      ```

    - An example for a response:
      ```json
      {
        "successMessage": "Successfully added the review!",
        "book": {
          "bookId": 28,
          "name": "Practise with Peppa: Wipe-Clean First Letters",
          "image": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/7232/9780723292081.jpg",
          "description": "Develop and practise first letter shapes with Peppa Pig and friends in this colourful wipe-clean activity book! Trace over the lowercase letters from a-z and learn new words through a range of fun Peppa-themed activities. Ideal for young readers who are starting school and learning to write first letter shapes, this book helps children form letters in the correct way with extra guidance for left-handers. Children can wipe the page clean each time and practise again and again. Also includes a free pen.",
          "author": "Peppa Pig",
          "genre": "fiction",
          "status": "free",
          "isDeleted": 1
        },
        "review": {
          "reviewId": 27,
          "text": "mamamia",
          "user": "admin",
          "userId": 1,
          "isDeleted": 0
        },
        "text": "mamamia"
      }
      ```

</details>

1.  **PUT/api/admin/books/:id/reviews/:reviewId** - _Updates the given review._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role.

    - An example: `PUT/api/admin/books/4/reviews/17`

    - An example for a request body:

    ```json
    {
      "text": "aleleuuu"
    }
    ```

    - An example for a response:

    ```json
    {
      "successMessage": "Successfully updated review with id 17!",
      "book": {
        "bookId": 4,
        "name": "Romeo and Juliet ",
        "image": "https://prodimage.images-bn.com/pimages/9780743477116_p0_v2_s1200x630.jpg",
        "description": "Romeo and Juliet is a tragedy written by William Shakespeare early in his career about two young star-crossed lovers whose deaths ultimately reconcile their feuding families. It was among Shakespeare's most popular plays during his lifetime and, along with Hamlet, is one of his most frequently performed plays.",
        "author": "William Shakespeare",
        "genre": "novel",
        "status": "free",
        "isDeleted": 0
      },
      "review": {
        "review_id": 17,
        "bookId": 29,
        "userId": 1,
        "text": "aleleuuu",
        "isDeleted": 0
      },
      "text": "aleleuuu"
    }
    ```

    </details>

1.  **DELETE/api/books/:id/reviews/:reviewId** - _Deletes the given review._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires an `Admin` role.

    - An example: `DELETE/api/books/3/reviews/14`

    - Does not need a request body

    - An example for a response:

    ```json
    {
      "successMessage": "Successfully removed the review with id 14!",
      "book": {
        "bookId": 3,
        "name": "The Mysterious Affair at Styles",
        "image": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0084/9780008400637.jpg",
        "description": "Agatha Christieâ€™s first novel, The Mysterious Affair at Styles, was the result of a dare from her sister Madge who challenged her to write a story. The story begins when Hastings is sent back to England from the First World War due to injury and is invited to spend his sick leave at the beautiful Styles Court by his old friend John Cavendish. Here, Hastings meets Johnâ€™s step-mother, Mrs Inglethorp, and her new husband, Alfred. Despite the tranquil surroundings Hastings begins to realise that all is not right. When Mrs Inglethorp is found poisoned, suspicion falls on the family, and another old friend, Hercule Poirot, is invited to investigate.",
        "author": "Agatha Christie",
        "genre": "criminal",
        "status": "borrowed",
        "isDeleted": 0
      },
      "review": {
        "review_id": 14,
        "bookId": 1,
        "userId": 4,
        "text": "Nice book!",
        "isDeleted": 1
      }
    }
    ```

    </details>

## Environment variables

| Environment Variable | Default value |
| :------------------- | :------------ |
| DB_HOST              | localhost     |
| DB_USER              | root          |
| DB_PASSWORD          | root          |

## Running Guide

### 1. Install the dependencies

To install the dependencies in the project directory, run:

```sh
npm install
```

### 2. Install and start MariaDB

[Click here](https://mariadb.com/kb/en/getting-installing-and-upgrading-mariadb/) to get MariaDB. Follow the running guide.

### 3. Run the SQL script from the `database` directory

### 4. Start the application

Then to start the application, run:

```sh
npm start
```

Wait until you see `Listening for library requests on port 5000!` in the Terminal.
Open Postman and make a request.
The server will reload if you make edits.
