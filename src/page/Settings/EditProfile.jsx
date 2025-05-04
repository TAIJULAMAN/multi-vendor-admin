function EditProfile() {
          return (
            <div className="bg-white px-20 w-[715px] py-5 rounded-md">
              <p className="text-[#0D0D0D] text-center font-bold text-2xl mb-5">
                Edit Your Profile
              </p>
              <form className="space-y-4">
                <div>
                  <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                    placeholder="Enter full name"
                    required
                  />
                </div>
        
                <div>
                  <label className="text-xl text-[#0D0D0D] mb-2 font-bold">Email</label>
                  <input
                    type="text"
                    name="contactNo"
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                    placeholder="Enter Contact Number"
                    required
                  />
                </div>
        
                <div>
                  <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
                    Contact No
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                    placeholder="Enter Address"
                    required
                  />
                </div>
        
                <div className="text-center py-5">
                  <button className="bg-[#0B704E] text-white font-semibold w-full py-3 rounded-lg">
                  Save & Change
                  </button>
                </div>
              </form>
            </div>
          );
        }
        
        export default EditProfile;
        