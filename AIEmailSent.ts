import nodemailer from 'nodemailer';
import catchError from './ErrorHandling';

const OrgData: RequestDataType[] = [
    {
        id: 1,
        full_name: "John Doe",
        created_at: "2026-02-18",
        phone: "0700000000",
        email: "John.Doe@email.com",
        request: "This is my Request regarding a course"
    }
];

const RequestData: RequestDataType[] = [];

const GroupData: RequestDataType[] = [
    {
        id: 2,
        full_name: "Steve Known",
        created_at: "2026-02-15",
        phone: "0700000001",
        email: "Steve.known@email.com",
        request: "I wondered about an up and comming course"
    }
];

type RequestDataType = {
    id: number;
    full_name: string;
    created_at: string;
    phone: string;
    email: string;
    request: string;
}

function buildTable(title: string, data: RequestDataType[]): string {
    const rows = data.length === 0
        ? `<tr><td colspan="5" style="padding: 10px; text-align: center; color: #333;">No requests found</td></tr>`
        : data.map((item) => `
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.full_name}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.email}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.phone}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.request}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.created_at}</td>
            </tr>
        `).join('');

    return `
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-top: 30px;">
            ${title}
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
                <tr style="background-color: #4CAF50; color: white;">
                    <th style="padding: 12px; text-align: left;">Name</th>
                    <th style="padding: 12px; text-align: left;">Email</th>
                    <th style="padding: 12px; text-align: left;">Phone</th>
                    <th style="padding: 12px; text-align: left;">Request</th>
                    <th style="padding: 12px; text-align: left;">Created At</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
}

async function LoadingStage() {
    const unitedData = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            ${buildTable('Organisation Requests', OrgData)}
            ${buildTable('Group Requests', GroupData)}
            ${buildTable('Requst Data', RequestData)};
            <p style="color: #999; font-size: 12px; margin-top: 30px;">
                This is an automated email. Please do not reply.
            </p>
        </div>
    `;

    await main(unitedData).catch(console.error);
}

async function main(data: string) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    const info = await transporter.sendMail({
        from: '"Test Sender" <test@example.com>',
        to: "recipient@example.com",
        subject: "Test Email",
        text: "This is a test email that is compling data from three different tables!",
        html: data,
    });

    console.log(nodemailer.getTestMessageUrl(info));
}

catchError(LoadingStage());