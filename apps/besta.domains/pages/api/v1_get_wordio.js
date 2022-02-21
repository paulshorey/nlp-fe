export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(
    `page https://besta.domains/api moved to https://documenter.getpostman.com/view/394576/UVeFMmG4#intro <script>window.location.href='https://documenter.getpostman.com/view/394576/UVeFMmG4#intro';</script>`
  );
}

// import { parse_error_message } from "twodashes-universal/esm/requests";
// import { message } from "antd";
// import axios from "axios";
//
// const DEVELOPMENT = process.env.NODE_ENV === "development";
// const API_HOST_PREFIX = DEVELOPMENT ? "http://localhost:1080/v1/" : "https://tmp_api.wordio.co/v1/";
//
// export default (req, res) => {
//   axios({
//     method: "get",
//     url: API_HOST_PREFIX + req.query.endpoint + "?str=" + req.query.str,
//     headers: { "content-type": "application/json" }
//   })
//     .then((results) => {
//       if (results.data && "data" in results.data) {
//         /*
//          * got data
//          */
//         res.status(200).json(results.data)
//         // res.statusCode = 200
//         // res.json(results.data)
//         // res.setHeader("Content-Type", "application/json");
//         // res.end(JSON.stringify(results.data));
//       } else {
//         message.error("availability response did not have data");
//       }
//     })
//     .catch((err) => {
//       message.error(parse_error_message(err), 10);
//     });
// };
