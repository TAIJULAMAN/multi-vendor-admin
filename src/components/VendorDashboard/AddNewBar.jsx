import { useState } from "react";
import { ConfigProvider, Form, Input, Upload, Button, message, TimePicker, Select, Checkbox } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const { TextArea } = Input;
const { Option } = Select;

function AddNewBar() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const amenitiesOptions = [
    { label: "Live Music", value: "liveMusic" },
    { label: "Dance Floor", value: "danceFloor" },
    { label: "VIP Section", value: "vipSection" },
    { label: "Outdoor Seating", value: "outdoorSeating" },
    { label: "Full Bar", value: "fullBar" },
    { label: "Food Service", value: "foodService" },
    { label: "Parking", value: "parking" },
    { label: "Smoking Area", value: "smokingArea" },
  ];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        openingTime: values.openingTime?.format("HH:mm"),
        closingTime: values.closingTime?.format("HH:mm"),
      };
      console.log("Form values:", formattedValues);
      message.success("Bar added successfully!");
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Failed to add bar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
        return false;
      }
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      if (newFileList.length > 3) {
        message.warning("You can only upload up to 3 images");
        return;
      }
      setFileList(newFileList);
    },
    fileList,
    maxCount: 3,
    multiple: true,
    accept: "image/*",
    showUploadList: false,
  };

  return (
    <div className="min-h-screen p-5 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
      <div className="">
        <div className="flex items-center justify-start mb-10">
          <h1 className="text-4xl font-bold text-white">Add New Bar</h1>
        </div>
        
        <div className="bg-[#1F1F1F] rounded-xl p-8 shadow-2xl border border-[#2d2d2d]">
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  labelColor: "#ffffff",
                },
                Input: {
                  colorBgContainer: "#2d2d2d",
                  colorBorder: "#3d3d3d",
                  colorText: "#ffffff",
                  activeBorderColor: "#0B704E",
                  hoverBorderColor: "#0B704E",
                },
                Select: {
                  colorBgContainer: "#2d2d2d",
                  colorBorder: "#3d3d3d",
                  colorText: "#ffffff",
                  colorTextPlaceholder: "#666666",
                  controlItemBgActive: "#0B704E",
                },
                TimePicker: {
                  colorBgContainer: "#2d2d2d",
                  colorBorder: "#3d3d3d",
                  colorText: "#ffffff",
                  colorIcon: "#666666",
                  colorIconHover: "#ffffff",
                },
                Checkbox: {
                  colorText: "#ffffff",
                },
              },
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="text-white space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Form.Item
                  label={<span className="text-gray-300 font-medium">Bar Name</span>}
                  name="name"
                  rules={[{ required: true, message: "Please enter bar name" }]}
                >
                  <Input placeholder="Enter bar name" className="py-2.5 px-4 rounded-lg" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-300 font-medium">Event Name</span>}
                  name="eventName"
                  rules={[{ required: true, message: "Please enter event name" }]}
                >
                  <Input placeholder="Enter event name" className="py-2.5 px-4 rounded-lg" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-300 font-medium">Email</span>}
                  name="email"
                  rules={[
                    { required: true, message: "Please enter email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input placeholder="Enter email" className="py-2.5 px-4 rounded-lg" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-300 font-medium">Phone</span>}
                  name="phone"
                  rules={[{ required: true, message: "Please enter phone number" }]}
                >
                  <Input placeholder="Enter phone number" className="py-2.5 px-4 rounded-lg" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-300 font-medium">Location</span>}
                  name="location"
                  rules={[{ required: true, message: "Please enter location" }]}
                >
                  <Input placeholder="Enter location" className="py-2.5 px-4 rounded-lg" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-300 font-medium">Cover Charge</span>}
                  name="coverCharge"
                  rules={[{ required: true, message: "Please enter cover charge" }]}
                >
                  <Input
                    type="number"
                    placeholder="Enter cover charge"
                    className="py-2.5 px-4 rounded-lg"
                    prefix="$"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-300 font-medium">Opening Time</span>}
                  name="openingTime"
                  rules={[{ required: true, message: "Please select opening time" }]}
                >
                  <TimePicker
                    format="HH:mm"
                    className="w-full py-2.5 px-4 rounded-lg"
                    placeholder="Select opening time"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-300 font-medium">Closing Time</span>}
                  name="closingTime"
                  rules={[{ required: true, message: "Please select closing time" }]}
                >
                  <TimePicker
                    format="HH:mm"
                    className="w-full py-2.5 px-4 rounded-lg"
                    placeholder="Select closing time"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-300 font-medium">Capacity</span>}
                  name="capacity"
                  rules={[{ required: true, message: "Please enter capacity" }]}
                >
                  <Input
                    type="number"
                    placeholder="Enter maximum capacity"
                    className="py-2.5 px-4 rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-300 font-medium">Bar Type</span>}
                  name="barType"
                  rules={[{ required: true, message: "Please select bar type" }]}
                >
                  <Select placeholder="Select bar type" className="py-0.5 rounded-lg">
                    <Option value="nightclub">Nightclub</Option>
                    <Option value="sportsBar">Sports Bar</Option>
                    <Option value="cocktailBar">Cocktail Bar</Option>
                    <Option value="pub">Pub</Option>
                    <Option value="wineBar">Wine Bar</Option>
                    <Option value="karaoke">Karaoke Bar</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                label={<span className="text-gray-300 font-medium">Description</span>}
                name="description"
                rules={[{ required: true, message: "Please enter description" }]}
              >
                <TextArea
                  placeholder="Enter description"
                  rows={4}
                  className="bg-[#2d2d2d] border-[#3d3d3d] text-white rounded-lg py-2.5 px-4"
                />
              </Form.Item>

              <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#3d3d3d]">
                <Form.Item
                  label={<span className="text-gray-300 font-medium">Amenities</span>}
                  name="amenities"
                  rules={[{ required: true, message: "Please select at least one amenity" }]}
                >
                  <Checkbox.Group
                    options={amenitiesOptions}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  />
                </Form.Item>
              </div>

              <Form.Item
                label={<span className="text-gray-300 font-medium">Upload Images</span>}
                name="images"
                rules={[{ required: true, message: "Please upload at least one image" }]}
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
              >
                <div className="space-y-4">
                  <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#3d3d3d]">
                    <Upload
                      {...uploadProps}
                      className="upload-list-inline"
                    >
                      <div className={`flex flex-col items-center justify-center p-8 border-2 border-dashed ${fileList.length >= 3 ? 'border-gray-700 cursor-not-allowed' : 'border-gray-600 cursor-pointer hover:border-[#0B704E]'} transition-colors bg-[#232323] hover:bg-[#2d2d2d] group rounded-lg`}>
                        <IoCloudUploadOutline className={`text-5xl mb-3 transition-colors ${fileList.length >= 3 ? 'text-gray-700' : 'text-gray-400 group-hover:text-[#0B704E]'}`} />
                        <p className={`font-medium transition-colors ${fileList.length >= 3 ? 'text-gray-700' : 'text-gray-400 group-hover:text-[#0B704E]'}`}>
                          {fileList.length >= 3 ? 'Maximum images reached' : 'Click or drag files to upload'}
                        </p>

                      </div>
                    </Upload>
                  </div>
                  
                  {fileList.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {fileList.map((file, index) => (
                        <div key={file.uid} className="relative group">
                          <div className="aspect-video">
                            <img
                              src={URL.createObjectURL(file.originFileObj)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg border-2 border-[#3d3d3d]"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button
                              icon={<MdDelete className="text-xl" />}
                              onClick={(e) => {
                                e.stopPropagation();
                                const newFileList = fileList.filter(item => item.uid !== file.uid);
                                setFileList(newFileList);
                              }}
                              className="bg-[#A80608] text-white border-none hover:bg-[#8a0507] flex items-center gap-2"
                            >
                              <span>Remove</span>
                            </Button>
                          </div>
                          <div className="absolute top-2 right-2 bg-[#2a2a2a] text-white text-xs px-2 py-1 rounded-full">
                            Image {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-500 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-[#0B704E] rounded-full"></span>
                      Upload up to 3 images (Maximum size: 2MB each)
                    </p>
                    <p className="text-gray-400">
                      {fileList.length}/3 images uploaded
                    </p>
                  </div>
                </div>
              </Form.Item>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-[#2d2d2d]">
                <Button
                  onClick={() => {
                    form.resetFields();
                    setFileList([]);
                  }}
                  icon={<MdDelete className="text-xl" />}
                  className="flex items-center border-[#A80608] text-[#A80608] hover:bg-[#A80608] hover:text-white px-6 py-2.5 h-auto rounded-lg transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="flex items-center bg-[#0B704E] text-white hover:bg-[#0A6346] px-8 py-2.5 h-auto rounded-lg transition-all duration-300"
                >
                  Publish
                </Button>
              </div>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default AddNewBar;