import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RegionMaster | 🧑‍💻</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #f5af19, #f12711);
            color: #fff;
            animation: backgroundAnimation 15s ease infinite;
            padding: 0 1rem;
           }
          @keyframes backgroundAnimation {
            0% { background: linear-gradient(135deg, #f5af19, #f12711); }
            50% { background: linear-gradient(135deg, #f12711, #f5af19); }
            100% { background: linear-gradient(135deg, #f5af19, #f12711); }
          }
          .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
          }
          .container h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            animation: fadeIn 2s ease;
          }
          .container p {
            font-weight: bold;
            animation: fadeIn 2s ease 1s;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>👋 Hello there!</h1>
          <p>Watsup, please feel free to explore the app. Thanks!</p>
        </div>
      </body>
      </html>
    `;
  }
}
