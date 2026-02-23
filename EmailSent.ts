import nodemailer from 'nodemailer';
import catchError from './ErrorHandling';

// const navLinks = links.map((link: Link) => (
//     <a class="nav-link" href={link.slug}>{link.label}</a>
// ));
const Data = [
    {
        id: 1,
        title: "SUPER TITLE"    
    },
    {
        id: 2,
        title: "DUPER TITLE"
    },
    {
        id: 3,
        title: "TROOPER TITLE"
    }
];

const RequestData: any = [];

const OrgData = [
    {
        id: 1,
        full_name: "John Doe",
        created_at: "2026-02-18",
        phone: "0700000000",
        email: "John.Doe@email.com",
        request: "This is my Request regarding a course"
    }
];

const GroupData = [
    {
        id: 2,
        full_name: "Steve Known",
        created_at: "2026-02-15",
        phone: "0700000001",
        email: "Steve.known@email.com",
        request: "I wondered about an up and comming course"
    }
];

const RequestData1 = [
    {
        id: 1,
        full_name: "John Doe",
        created_at: "2026-02-18",
        phone: "0700000000",
        email: "John.Doe@email.com",
        request: "This is my Request regarding a course"
    },
    {
        id: 2,
        full_name: "Steve Known",
        created_at: "2026-02-15",
        phone: "0700000001",
        email: "Steve.known@email.com",
        request: "I wondered about an up and comming course"
    }
]

type RequestDataType = {
    id: number;
    full_name: string;
    created_at: string;
    phone: string;
    email: string;
    request: string;
}

type DataType = {
    id: number;
    title: string;
}

// const linkedData = Data.map((item: DataType) => {
//     return `<h1>${item.title}</h1>`;
// }).join('');




const htmlBody = "<details><summary>Data List</summary><p>This is the data!</p></details>";

async function LoadingStage() {

    let unitedData: string;

    if (!RequestData || RequestData.length === 0) {

    unitedData = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            
            <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
                Incoming Requests
            </h2>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
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
                    <tr>
                        <td>No Requests was found</td>
                    </tr>
                </tbody>
            </table>

            <p style="color: #999; font-size: 12px; margin-top: 30px;">
                This is an automated email. Please do not reply.
            </p>
        </div>
    `;
        
    } else {

        const linkedData = RequestData.map((item: RequestDataType) => {
            return `
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.full_name}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.email}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.phone}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.request}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.created_at}</td>
            </tr>
            `;
        }).join('');

        unitedData = `
            <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
                
                <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
                    Incoming Requests
                </h2>

                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
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
                        ${linkedData}
                    </tbody>
                </table>

                <p style="color: #999; font-size: 12px; margin-top: 30px;">
                    This is an automated email. Please do not reply.
                </p>
            </div>
        `;        
    }
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
        text: "This is a test email sent via Ethereal!",
        html: data,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);

    console.log(previewUrl);
}

catchError(LoadingStage());