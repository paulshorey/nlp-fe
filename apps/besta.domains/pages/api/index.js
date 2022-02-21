export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(
    `page https://besta.domains/api moved to https://documenter.getpostman.com/view/394576/UVeFMmG4#intro <script>window.location.href='https://documenter.getpostman.com/view/394576/UVeFMmG4#intro';</script>`
  );
}
