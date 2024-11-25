// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ResumeManagement {
    enum UserType {
        Unregistered,    // 未註冊
        JobSeeker,       // 求職者
        Company          // 公司
    }

    struct Company {
        string name;
        string description;
        bool isVerified;      // 是否已驗證
        address verifier;     // 驗證者(可以是特定機構)
    }

    struct Experience {
        string category;      
        string institution;   
        string title;        
        uint256 startDate;   
        uint256 endDate;     
        string description;  
        bool isValid;       
        address verifier;   
    }
    
    // 儲存使用者類型
    mapping(address => UserType) public userTypes;
    // 儲存公司資訊
    mapping(address => Company) public companies;
    // 儲存求職者經歷
    mapping(address => Experience[]) private experiences;
    
    // 事件
    event UserRegistered(address indexed user, UserType userType);
    event CompanyVerified(address indexed company, address indexed verifier);
    event ExperienceAdded(address indexed owner, uint256 indexed index);
    event ExperienceUpdated(address indexed owner, uint256 indexed index);
    event ExperienceVerified(address indexed owner, uint256 indexed index, address indexed verifier);
    
    // 修飾器：只有未註冊用戶
    modifier onlyUnregistered() {
        require(userTypes[msg.sender] == UserType.Unregistered, "Already registered");
        _;
    }
    
    // 修飾器：只有求職者
    modifier onlyJobSeeker() {
        require(userTypes[msg.sender] == UserType.JobSeeker, "Not a job seeker");
        _;
    }
    
    // 修飾器：只有已驗證的公司
    modifier onlyVerifiedCompany() {
        require(
            userTypes[msg.sender] == UserType.Company && 
            companies[msg.sender].isVerified, 
            "Not a verified company"
        );
        _;
    }
    
    // 註冊為求職者
    function registerAsJobSeeker() public onlyUnregistered {
        userTypes[msg.sender] = UserType.JobSeeker;
        emit UserRegistered(msg.sender, UserType.JobSeeker);
    }
    
    // 註冊為公司
    function registerAsCompany(
        string memory _name, 
        string memory _description
    ) public onlyUnregistered {
        userTypes[msg.sender] = UserType.Company;
        companies[msg.sender] = Company({
            name: _name,
            description: _description,
            isVerified: false,
            verifier: address(0)
        });
        emit UserRegistered(msg.sender, UserType.Company);
    }
    
    // 驗證公司(需要由指定的驗證機構呼叫)
    function verifyCompany(address _company) public {
        require(userTypes[_company] == UserType.Company, "Not a company");
        // 這裡可以加入驗證者的權限檢查
        companies[_company].isVerified = true;
        companies[_company].verifier = msg.sender;
        emit CompanyVerified(_company, msg.sender);
    }
    
    // 新增經歷 (只有求職者可呼叫)
    function addExperience(
        string memory _category,
        string memory _institution,
        string memory _title,
        uint256 _startDate,
        uint256 _endDate,
        string memory _description
    ) public onlyJobSeeker returns (uint256) {
        Experience memory newExp = Experience({
            category: _category,
            institution: _institution,
            title: _title,
            startDate: _startDate,
            endDate: _endDate,
            description: _description,
            isValid: false,
            verifier: address(0)
        });
        
        experiences[msg.sender].push(newExp);
        uint256 index = experiences[msg.sender].length - 1;
        emit ExperienceAdded(msg.sender, index);
        return index;
    }
    
    // 更新經歷 (只有求職者可呼叫)
    function updateExperience(
        uint256 _index,
        string memory _category,
        string memory _institution,
        string memory _title,
        uint256 _startDate,
        uint256 _endDate,
        string memory _description
    ) public onlyJobSeeker {
        require(_index < experiences[msg.sender].length, "Experience does not exist");
        
        Experience storage exp = experiences[msg.sender][_index];
        exp.category = _category;
        exp.institution = _institution;
        exp.title = _title;
        exp.startDate = _startDate;
        exp.endDate = _endDate;
        exp.description = _description;
        exp.isValid = false;
        exp.verifier = address(0);
        
        emit ExperienceUpdated(msg.sender, _index);
    }
    
    // 驗證經歷 (只有已驗證的公司可呼叫)
    function verifyExperience(
        address _jobSeeker, 
        uint256 _index
    ) public onlyVerifiedCompany {
        require(_index < experiences[_jobSeeker].length, "Experience does not exist");
        require(userTypes[_jobSeeker] == UserType.JobSeeker, "Not a job seeker");
        
        Experience storage exp = experiences[_jobSeeker][_index];
        exp.isValid = true;
        exp.verifier = msg.sender;
        
        emit ExperienceVerified(_jobSeeker, _index, msg.sender);
    }
    
    // 查詢單一經歷
    function getExperience(address _owner, uint256 _index) 
        public 
        view 
        returns (
            string memory category,
            string memory institution,
            string memory title,
            uint256 startDate,
            uint256 endDate,
            string memory description,
            bool isValid,
            address verifier
        )
    {
        require(_index < experiences[_owner].length, "Experience does not exist");
        Experience storage exp = experiences[_owner][_index];
        
        return (
            exp.category,
            exp.institution,
            exp.title,
            exp.startDate,
            exp.endDate,
            exp.description,
            exp.isValid,
            exp.verifier
        );
    }
    
    // 獲取經歷數量
    function getExperienceCount(address _owner) 
        public 
        view 
        returns (uint256) 
    {
        return experiences[_owner].length;
    }

    // 查詢公司資訊
    function getCompanyInfo(address _company)
        public
        view
        returns (
            string memory name,
            string memory description,
            bool isVerified,
            address verifier
        )
    {
        Company storage company = companies[_company];
        return (
            company.name,
            company.description,
            company.isVerified,
            company.verifier
        );
    }
}