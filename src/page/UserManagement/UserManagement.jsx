import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

function UserManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const dataSource = [
        {
            key: "1",
            no: "1",
            name: "John Doe",
            date: "05/03/2025",
            phone: "+1 9876543210",
            email: "johndoe@example.com",
            location: "New York, USA",
        },
        {
            key: "2",
            no: "2",
            name: "Jane Smith",
            date: "10/04/2025",
            phone: "+44 1234567890",
            email: "janesmith@example.com",
            location: "London, UK",
        },
        {
            key: "3",
            no: "3",
            name: "Ali Khan",
            date: "15/02/2025",
            phone: "+92 3345678901",
            email: "alikhan@example.com",
            location: "Karachi, Pakistan",
        },
        {
            key: "4",
            no: "4",
            name: "Emily Davis",
            date: "20/05/2025",
            phone: "+33 6789012345",
            email: "emilydavis@example.com",
            location: "Paris, France",
        },
        {
            key: "5",
            no: "5",
            name: "Michael Brown",
            date: "25/06/2025",
            phone: "+61 4567890123",
            email: "michaelbrown@example.com",
            location: "Sydney, Australia",
        },
        {
            key: "6",
            no: "6",
            name: "Sara Lee",
            date: "02/01/2025",
            phone: "+82 1012345678",
            email: "saralee@example.com",
            location: "Seoul, South Korea",
        },
        {
            key: "7",
            no: "7",
            name: "Carlos Mendez",
            date: "11/07/2025",
            phone: "+34 612345678",
            email: "carlosm@example.com",
            location: "Madrid, Spain",
        },
        {
            key: "8",
            no: "8",
            name: "Anna Müller",
            date: "23/03/2025",
            phone: "+49 1723456789",
            email: "annam@example.com",
            location: "Berlin, Germany",
        },
        {
            key: "9",
            no: "9",
            name: "Tomás Silva",
            date: "05/08/2025",
            phone: "+55 11987654321",
            email: "tomass@example.com",
            location: "São Paulo, Brazil",
        },
        {
            key: "10",
            no: "10",
            name: "Liam O'Reilly",
            date: "18/09/2025",
            phone: "+353 851234567",
            email: "liamo@example.com",
            location: "Dublin, Ireland",
        },
        {
            key: "11",
            no: "11",
            name: "Zhang Wei",
            date: "30/04/2025",
            phone: "+86 13812345678",
            email: "zhangwei@example.com",
            location: "Beijing, China",
        },
        {
            key: "12",
            no: "12",
            name: "Olivia Garcia",
            date: "07/10/2025",
            phone: "+1 4085551234",
            email: "oliviag@example.com",
            location: "San Jose, USA",
        },
        {
            key: "13",
            no: "13",
            name: "Yuki Tanaka",
            date: "12/11/2025",
            phone: "+81 8034567890",
            email: "yukitanaka@example.com",
            location: "Tokyo, Japan",
        },
        {
            key: "14",
            no: "14",
            name: "Nina Petrova",
            date: "21/12/2025",
            phone: "+7 9123456789",
            email: "ninap@example.com",
            location: "Moscow, Russia",
        },
        {
            key: "15",
            no: "15",
            name: "Ahmed Zaki",
            date: "03/01/2025",
            phone: "+20 1012345678",
            email: "ahmedz@example.com",
            location: "Cairo, Egypt",
        },
        {
            key: "16",
            no: "16",
            name: "Linda Johnson",
            date: "14/02/2025",
            phone: "+1 3035557890",
            email: "lindaj@example.com",
            location: "Denver, USA",
        },
        {
            key: "17",
            no: "17",
            name: "Jacob Wong",
            date: "22/03/2025",
            phone: "+65 91234567",
            email: "jacobw@example.com",
            location: "Singapore",
        },
        {
            key: "18",
            no: "18",
            name: "Fatima Noor",
            date: "01/04/2025",
            phone: "+971 501234567",
            email: "fatiman@example.com",
            location: "Dubai, UAE",
        },
        {
            key: "19",
            no: "19",
            name: "Victor Hugo",
            date: "10/05/2025",
            phone: "+33 612345678",
            email: "victorh@example.com",
            location: "Lyon, France",
        },
        {
            key: "20",
            no: "20",
            name: "Isabella Rossi",
            date: "17/06/2025",
            phone: "+39 3456789012",
            email: "isabellar@example.com",
            location: "Rome, Italy",
        },
        {
            key: "21",
            no: "21",
            name: "George Kimani",
            date: "05/07/2025",
            phone: "+254 712345678",
            email: "georgek@example.com",
            location: "Nairobi, Kenya",
        },
        {
            key: "22",
            no: "22",
            name: "Chloe Wilson",
            date: "16/08/2025",
            phone: "+61 412345678",
            email: "chloew@example.com",
            location: "Melbourne, Australia",
        },
        {
            key: "23",
            no: "23",
            name: "Mohammed Al-Farsi",
            date: "23/09/2025",
            phone: "+968 91234567",
            email: "mohammedf@example.com",
            location: "Muscat, Oman",
        },
        {
            key: "24",
            no: "24",
            name: "Julia Novak",
            date: "04/10/2025",
            phone: "+420 601234567",
            email: "julian@example.com",
            location: "Prague, Czech Republic",
        },
        {
            key: "25",
            no: "25",
            name: "Leon Schmidt",
            date: "12/11/2025",
            phone: "+49 1571234567",
            email: "leons@example.com",
            location: "Munich, Germany",
        },
        {
            key: "26",
            no: "26",
            name: "Aisha Bello",
            date: "27/11/2025",
            phone: "+234 8012345678",
            email: "aishab@example.com",
            location: "Lagos, Nigeria",
        },
        {
            key: "27",
            no: "27",
            name: "Daniel Evans",
            date: "03/12/2025",
            phone: "+1 2025550147",
            email: "danielevans@example.com",
            location: "Washington DC, USA",
        },
        {
            key: "28",
            no: "28",
            name: "Tania Lopez",
            date: "13/12/2025",
            phone: "+52 5512345678",
            email: "tanial@example.com",
            location: "Mexico City, Mexico",
        },
        {
            key: "29",
            no: "29",
            name: "Hiroshi Nakamura",
            date: "20/12/2025",
            phone: "+81 9065432109",
            email: "hiroshi@example.com",
            location: "Osaka, Japan",
        },
        {
            key: "30",
            no: "30",
            name: "Sophie Dubois",
            date: "29/12/2025",
            phone: "+33 655432198",
            email: "sophied@example.com",
            location: "Nice, France",
        }
    ];

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <div className="flex gap-2 text-center py-2">
                    <button
                        className="bg-[#0DC553] text-white font-semibold py-2 px-5 rounded-lg"
                    >
                        Approve
                    </button>
                    <button
                        className="bg-[#A80608] text-white font-semibold py-2 px-5 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
                <h1 className="text-start text-white text-3xl font-bold mb-5">User Management</h1>
                <div className="relative w-full sm:w-[300px] mt-5 md:mt-0 lg:mt-0">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-[#e5eaf2] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
                    />
                    <span className=" text-gray-500 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
                        <IoSearch className="text-[1.3rem]" />
                    </span>
                </div>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        InputNumber: {
                            activeBorderColor: "rgb(19,194,194)",
                        },
                        Pagination: {
                            colorPrimaryBorder: "rgb(32,84,6)",
                            colorBorder: "rgb(42,108,9)",
                            colorPrimary: "rgb(37,102,5)",
                            colorPrimaryHover: "rgb(19,194,194)",
                            colorText: "rgb(19,194,194)",
                            // colorBgTextHover: "rgb(19,194,194)",
                            itemSize: 40,
                            controlOutline: "rgb(19,194,194)"
                        },
                      
                        // Pagination: {
                        //     colorPrimaryBorder: "rgb(19,194,194)",
                        //     colorBorder: "rgb(19,194,194)",
                        //     colorPrimaryHover: "rgb(19,194,194)",
                        //     colorBgTextActive: "rgb(19,194,194)",
                        //     colorTextDisabled: "rgb(19,194,194)",
                        //     colorTextPlaceholder: "rgb(19,194,194)",
                        //     itemActiveBgDisabled: "rgb(255,255,255)",
                        //     colorPrimary: "rgb(19,194,194)",
                        // },
                        Table: {
                            headerBg: "#0B704E",
                            headerColor: "rgb(255,255,255)",
                            cellFontSize: 20,
                            headerSplitColor: "#0B704E",
                        },
                    },
                }}
            >
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: "max-content" }}
                />
                <Modal
                    open={isModalOpen}
                    centered
                    onCancel={handleCancel}
                    footer={null}
                >
                    <div className="flex flex-col justify-center items-center p-5">
                        <h1 className="text-xl text-center text-[#00C0B5]">
                            Are you sure !
                        </h1>
                        <p>Do you want to Block your Users profile ?</p>
                        <div className="text-center py-5">
                            <button
                                onClick={handleOk}
                                className="bg-[#00c0b5] text-white font-semibold w-full py-2 px-5 rounded transition duration-200"
                            >
                                CONFIRM
                            </button>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </div>
    );
}

export default UserManagement;