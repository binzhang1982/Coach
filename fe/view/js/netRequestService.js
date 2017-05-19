angular.module('appModule')
    .factory('netRequest', ['$q', '$http', 'Url', 'serviceLoading', 'wraploading', "$rootScope", function ($q, $http, Url, serviceLoading, wraploading, $rootScope) {
        function handleResponse(promise) {
            return promise.then(function (res) {
                serviceLoading.hideLoading();
                if (typeof(res.data) == "string" && res.data.indexOf('<div class="loading-text">Loading CIIC SSO...</div>') != -1) {
                    $.alert('登录超时!', function () {
                        window.location.reload();
                    });
                    return;
                } else if (res.status == 202) {
                    $.alert('没有当前操作权限!');
                    return;
                }
                if (res.data.status == "ok")
                    return $q.resolve(res.data.data);
                else if (res.data.status == "error" && res.data.data == "10000")
                    $.alert("没有当前操作权限!");
                else
                    return $q.reject(res.data.message);
            }, function (res) {
                serviceLoading.hideLoading();
                return $q.reject("服务器请求异常");
            });
        }

        //设置10s请求超时
        var timeout = 10000000;
        var returnedObj = {
            //获取临时审批开关
            getApprovalFlowSwitch: function () {
                var promise = $http.get(Url.approvalFlowSwitch, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取公共数据字典
            getComDitcData: function (groupId) {
                var promise = $http.get(Url.dictData + "/" + groupId, {timeout: timeout});
                return handleResponse(promise);
            },
            getComDitcDataWidthCache: function (groupId, cacheName, fillDataCallback) {
                var cache = $rootScope.dictCache || {};
                $rootScope.dictCache = cache;

                if (cache[cacheName]) {
                    if (fillDataCallback) fillDataCallback(cache[cacheName]);
                } else {
                    this.getComDitcData(groupId).then(function (res) {
                        serviceLoading.hideLoading();

                        cache[cacheName] = res;
                        if (fillDataCallback) fillDataCallback(cache[cacheName]);
                    }, function (err) {
                        serviceLoading.hideLoading();

                        $.alert(err);
                    });
                }
            },
            //销售管理客户列表分页请求
            getCustomerSearch: function (pagyRequest) {
                var url = Url.customer + "?" + pagyRequest;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //销售管理管理方列表分页请求
            getManagingSearch: function (pagyRequest) {
                var url = Url.manage + "?" + pagyRequest;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //销售管理项目列表分页请求
            getProjectSearch: function (pagyRequest) {
                var url = Url.project + "?" + pagyRequest;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取管理方和客户列表
            getManagetCustomer: function (data) {
                var MC = $http.get(Url.managecustomer + "?" + data, {timeout: timeout});
                return MC.then(function (res) {
                    serviceLoading.hideLoading();
                    if (res.data.status == "ok")
                        return $q.resolve(res.data);
                    else
                        return $q.reject(res.data.message);
                }, function (res) {
                    serviceLoading.hideLoading();
                    return $q.reject("服务器请求异常");
                });
            },
            //获取雇员列表
            getEmployeeCustomer: function (id) {
                var MC = $http.get(Url.employeeSearchList + "?" + id, {timeout: timeout});
                return MC.then(function (res) {
                    serviceLoading.hideLoading();

                    if (res.data.status == "ok")
                        return $q.resolve(res.data);
                    else
                        return $q.reject(res.data.message);
                }, function (res) {
                    serviceLoading.hideLoading();

                    return $q.reject("服务器请求异常");
                });
            },
            //雇员详情employeeSearchDetail
            getEmployeeCustomerDetail: function (id) {
                var MC = $http.get(Url.employeeSearchDetail + "/" + id, {timeout: timeout});
                return MC.then(function (res) {
                    serviceLoading.hideLoading();

                    if (res.data.status == "ok")
                        return $q.resolve(res.data);
                    else
                        return $q.reject(res.data.message);
                }, function (res) {
                    serviceLoading.hideLoading();

                    return $q.reject("服务器请求异常");
                });
            },
            //根据雇员版本号获取雇员详情
            getEmployeeCustomerDetailByVersionId: function (id) {
                var MC = $http.get(Url.employeeSearchDetail + "/detail/" + id, {timeout: timeout});
                return MC.then(function (res) {
                    serviceLoading.hideLoading();

                    if (res.data.status == "ok")
                        return $q.resolve(res.data);
                    else
                        return $q.reject(res.data.message);
                }, function (res) {
                    serviceLoading.hideLoading();

                    return $q.reject("服务器请求异常");
                });
            },


            //获取雇员详情信息
            /*            getEmployeeDeil: function (empId) {
             var MC = $http.get(Url.employeeSearchDeil + "/" + empId, {timeout: timeout});
             return MC.then(function (res) {
             if (res.data.status == "ok")
             return $q.resolve(res.data);
             else
             return $q.reject(res.data.message);
             }, function (res) {
             return $q.reject("服务器请求异常");
             }
             );
             },*/
            //雇员新增
            getEmployeeAdd: function (empId) {
                var promise = $http.post(Url.employeeAdd, empId, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取管理方详细信息
            getHomeClientDetailBasic: function (id) {
                var url = Url.manage + '/' + id;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //删除管理方联系人判断是否是项目唯一联系人
            deleteContactorChargeByProject: function (id) {
                var url = Url.personProject + id;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //保存管理方信息（联系人及客户信息）
            submitManager: function (manager) {
                var promise = $http.post(Url.manage, manager, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取管理方下项目列表
            getManageProjectList: function (id, params) {
                var url = Url.manageProject.replace(/{id}/g, id);
                if (params != null)
                    url += "?" + params;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //查询项目详情
            getProjectDetail: function (id) {
                var promise = $http.get(Url.project + "/" + id, {timeout: timeout});
                return handleResponse(promise);
            },
            //查询客户详情
            getCustomerDetail: function (id) {
                var promise = $http.get(Url.customer + "/" + id, {timeout: timeout});
                return handleResponse(promise);
            },
            //提交立项申请
            submitProject: function (project) {
                var promise = $http.post(Url.submitProject, project, {timeout: timeout});
                return handleResponse(promise);
            },
            //提交客户申请
            submitCustomer: function (customer) {
                var promise = $http.post(Url.submitCustomer, customer, {timeout: timeout});
                return handleResponse(promise);
            },
            //新增联系人
            createContact: function (person) {
                var promise = $http.post(Url.person, person, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取联系人详情
            getContactDetail: function (id) {
                var promise = $http.get(Url.person + "/" + id, {timeout: timeout});
                return handleResponse(promise);
            },
            //联系人电脑唯一性校验
            getContactPhone: function (phoneType,phoneNumber) {
                var url = Url.ContactPhone.replace(/{phoneType}/, phoneType).replace(/{phoneNumber}/, phoneNumber);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取联系人电话类型
            getContactPhoneType: function () {
                var promise = $http.get(Url.contactPhoneType, {timeout: timeout});
                return handleResponse(promise);
            },
            getDictData: function (dictType) {
                var promise = $http.get(Url.dictData + "/" + dictType, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取组织结构（获取参与人）
            getPartsOfArea: function () {
                var promise = $http.get(Url.org, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取当前参与人
            getCurrentOrg: function () {
                var promise = $http.get(Url.currentOrg, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取当前用户信息
            getCurrentUser: function () {
                var promise = $http.get(Url.getCurrentUser, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取操作模式
            getOriginopMode: function () {
                var promise = $http.get(Url.originopmode, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取新增客户编码
            getNewCustomerCode: function () {
                var promise = $http.get(Url.newcustomercode, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取管理方下的客户
            getCustomers: function (id) {
                var url = Url.customers.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //查询业务范畴
            getBusiCate: function () {
                var promise = $http.get(Url.busiCate, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取管理方变更记录
            getupdateManagingHistory: function (id) {
                var promise = $http.get(Url.updateManagingHistory+id, {timeout: timeout});
                return handleResponse(promise);
            },
            //查询项目业务范畴
            getProjectBusiCate: function () {
                var promise = $http.get(Url.projectBusiCate, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取管理方下的联系人
            getContactsOfManage: function (id) {
                var url = Url.personOfManage.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //查询项目列表
            getProjectList: function (options) {
                var url = Url.project;
                var first = true;
                for (var key in options) {
                    if (first){
                        url += "?" + key + "=" + options[key];
                        first=false;
                    }
                    else
                        url += "&" + key + "=" + options[key];
                }
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /**保存项目草稿 */
            saveProject: function (project) {
                var promise = $http.post(Url.project, project, {timeout: timeout});
                return handleResponse(promise);
            },
            /**保存客户草稿 */
            saveCustomer: function (customer) {
                var promise = $http.post(Url.customer, customer, {timeout: timeout});
                return handleResponse(promise);
            },
            /**获取深度开发类别 */
            deepdev: function () {
                var promise = $http.get(Url.deepdev, {timeout: timeout});
                return handleResponse(promise);
            },
            //管理方模糊查询下拉
            getMagmtSearch: function (name,status,wfStatus) {
                var url = Url.manage +"?managingName="+ name;
                if(status!=null){
                    if(toString.call(status)!="[object Array]")
                        url=url+"&status="+status;
                    else{
                        for(var i=0;i<status.length;i++){
                            url=url+"&status="+status[i];
                        }
                    }
                }
                if(wfStatus!=null){
                    if(toString.call(wfStatus)!="[object Array]")
                        url=url+"&wfStatus="+wfStatus;
                    else{
                        for(var i=0;i<wfStatus.length;i++){
                            url=url+"&wfStatus="+wfStatus[i];
                        }
                    }
                }
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //项目列表分页请求
            //projectPagination: function (obj) {
            //    var url = Url
            //},
            //通过项目id获取客户的业务范畴列表
            getBusiEditableList: function (projectId) {
                var url = Url.busiEditableList.replace("{projectId}", projectId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //查询报价单列表
            getQuoteSearch: function (pagyRequest) {
                var url = Url.quote + "?" + pagyRequest;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //保存报价单
            saveQuote: function (quote) {
                var promise = $http.post(Url.quote, quote, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取报价单详情
            getQuoteDetail: function (id) {
                var url = Url.quoteDetail.replace(/{quotId}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取项目下的报价单列表
            getQuoteOfProject: function (projId) {
                var url = Url.quoteOfProject.replace(/{projectid}/, projId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //查询项目下可以提交审批的报价单
            getUnapprovedQuotation: function (projId) {
                var url = Url.findUnapprovedQuotationUrl.replace(/{projId}/, projId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //查询项目下可以提交审批的合同
            getUnapprovedContract: function (projId) {
                var url = Url.findUnapprovedContractUrl.replace(/{projId}/, projId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //项目失败
            getProjectFail: function (projId) {
                var promise = $http.post(Url.getProjectFailUrl, {status: 3, projId: projId}, {timeout: timeout});
                return handleResponse(promise);
            },
            //项目领取
            getProjectClaim: function (projId,claimRemark) {
                var promise = $http.post(Url.getProjectClaimUrl, {status: 4, projId: projId,claimRemark:claimRemark}, {timeout: timeout});
                return handleResponse(promise);
            },
            //报价单失效
            changeToDisable: function (quoteid) {
                var url = Url.quoteDisable.replace(/{id}/, quoteid);
                var promise = $http.post(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取城市列表
            getCityList: function () {
                var promise = $http.get(Url.city, {timeout: timeout});
                return handleResponse(promise);
            },
            //雇员获取城市列表
            getCityTree: function () {
                var promise = $http.get(Url.cityTree, {timeout: timeout});
                return handleResponse(promise);
            },

            //获取业务大类和下面的产品分类
            getBusiCateAndClassList: function () {
                var promise = $http.get(Url.busiCateAndClassList, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取套餐列表 hexiang
            getPackageList: function (options) {
                var url = Url.packageList;
                var first = true;
                for (var key in options) {
                    if (first) {
                        url += "?" + key + "=" + options[key];
                        first = false;
                    } else
                        url += "&" + key + "=" + options[key];
                }
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取产品列表 hexiang
            getProdList: function (options) {
                var url = Url.prodList;
                var first = true;
                for (var key in options) {
                    if (first) {
                        url += "?" + key + "=" + options[key];
                        first = false;
                    } else
                        url += "&" + key + "=" + options[key];
                }
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取单项产品详情
            getProdDetail: function (prodOfferId) {
                var url = Url.prodDetail + prodOfferId;
                var promise = $http.get(url);
                return handleResponse(promise);
            },
            getQuoteProductDetail:function (quoteProdId) {
                var url = Url.getQuoteProductDetailUrl.replace(/{quoteProdId}/, quoteProdId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取套餐产品详情
            getPackageDetail: function (prodPkgOfferId) {
                var url = Url.packageDetail + prodPkgOfferId;
                var promise = $http.get(url);
                return handleResponse(promise);
            },
            //获取价格单位
            getMeasureUnit: function () {
                var promise = $http.get(Url.measureUnit);
                return handleResponse(promise);
            },
            //获取报价单城市列表
            getQuotCity: function (quotCity) {
                var url = Url.quotCity + quotCity;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取产品菜单列表
            getProductMenu: function (data) {
                var url = Url.prodProdMemuList + "?" + data;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取报价单常用城市列表
            getCommonCityList: function () {
                var promise = $http.get(Url.commonCity, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取报价单省会直辖市城市列表
            getProvinceCityList: function () {
                var promise = $http.get(Url.provinceCity, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取报价单省会直辖市城市列表
            getNonProvinceCity: function (nonProvinceCity) {
                var url = Url.nonProvinceCity + nonProvinceCity;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取报价单非常用城市列表
            getUnCommonCityList: function (unCommonCity) {
                var url = Url.unCommonCity + unCommonCity;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取产品单品列表
            getProdOfferList: function (data) {
                var url = Url.prodOfferList + "?" + data;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取产品套餐列表
            getProdPkgOffer: function (data) {
                var url = Url.prodPkgOfferList + "?" + data;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //保存报价单
            submitQuote: function (quote) {
                var promise = $http.post(Url.submitQuote, quote, {timeout: timeout});
                return handleResponse(promise);
            },
            // 报价单批量审批
            submitQuoteBatch: function (quote) {
                var promise = $http.post(Url.submitQuoteBatch, quote, {timeout: timeout});
                return handleResponse(promise);
            },
            /**保存项目草稿 */
            saveRegulation: function (regulation) {
                var promise = $http.post(Url.regulation, regulation, {timeout: timeout});
                return handleResponse(promise);
            },
            /**变更保存*/
            changgeRegulation: function (ruleRepository) {
                var promise = $http.post(Url.changgeRegulation, ruleRepository, {timeout: timeout});
                return handleResponse(promise);
            },
            /**取得列表 */
            getRegulationSearch: function (request) {
                var url = Url.regulationList + "?" + request;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /**页面详细取得 */
            getRegulationDetail: function (id) {
                var url = Url.getInfoByRuleRepositoryId.replace(/{ruleRepositoryId}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /**复制追加规则 */
            getCopyedRegulation: function (id) {
                var url = Url.copyRuleRepository.replace(/{ruleRepositoryId}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /** 生效规则one*/
            toEffectiveRuleRepository: function (id) {
                var url = Url.effectiveRuleRepository.replace(/{ruleRepositoryId}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /** 生效规则two*/
            toEffectiveRuleStatusRepository: function (id) {
                var url = Url.toEffectiveRuleStatusRepository.replace(/{ruleRepositoryId}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /** 设置默认规则 */
            regulationToDefalut: function (id) {
                var url = Url.ruleRepositoryToDefalut.replace(/{ruleRepositoryId}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /** 通过城市取得机构列表 */
            getServiceAgencys: function (id) {
                var url = Url.getServiceAgencysById.replace(/{cityId}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /** 取得变更履历 */
            getRuleRepositoryLogList: function (id) {
                var url = Url.getRuleRepositoryLogListById.replace(/{ruleRepositoryId}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            // 变更生效
            versionupRuleRepository: function (regulation) {
                var promise = $http.post(Url.variationRuleRepository, regulation, {timeout: timeout});
                return handleResponse(promise);
            },
            // 复制增加保存数据
            saveCopyRegulation: function (regulation) {
                var promise = $http.post(Url.copyAddRegulation, regulation, {timeout: timeout});
                return handleResponse(promise);
            },
            copyAndEffRegulation: function (regulation) {
                var promise = $http.post(Url.copyRegulationEff, regulation, {timeout: timeout});
                return handleResponse(promise);
            },
            saveAndEffRegulation: function (regulation) {
                var promise = $http.post(Url.saveRegulationEff, regulation, {timeout: timeout});
                return handleResponse(promise);
            }
            // 获取规则仓库查看页面选项列表
            ,
            getRegulationViewInitData: function () {
                var url = Url.getCityAndRuleListUrl;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 根据规则ID,细则ID,月份取得细则详情以及相关要求
            ,
            getRuleRepositoryDetailView: function (request) {
                var url = Url.getRuleRepositoryDetailUrl + "?" + request;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            checkRuleRepositoryName: function (request) {
                var url = Url.checkRuleRepositoryName + "?" + request;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            checkRuleRepositoryIsDefault: function (request) {
                var url = Url.checkRuleRepositoryIsDefault + "?" + request;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 查询规则仓库变更历史记录
            ,
            getRuleRepositoryHistory: function (year, versionId, ruleRepositoryId) {
                var url = Url.getRuleRepositoryDetailLogUrl.replace(/{year}/, year).replace(/{versionId}/, versionId).replace(/{ruleRepositoryId}/, ruleRepositoryId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // ---↓↓合同↓↓-- //
            ,
            getContractInfoDetail: function (id) {
                var url = Url.getContractInfo.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            goContractInfoFromProj: function (id) {
                var url = Url.goContractInfoAdd.replace(/{projId}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            saveContract: function (contract) {
                var promise = $http.post(Url.addNewContract, contract, {timeout: timeout});
                return handleResponse(promise);
            },
            getContractList: function (request) {
                var url = Url.getContractListUrl + "?" + request;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            getCustomerByBusiCate: function (busiCate, projId) {
                var url = Url.getCustomerByBusiCate.replace(/{busiCate}/, busiCate).replace(/{projId}/, projId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            aprovalContract: function (contract) {
                var promise = $http.post(Url.aprovalContract, contract, {timeout: timeout});
                return handleResponse(promise);
            },
            aprovalContractBatch: function (contract) {
                var promise = $http.post(Url.aprovalContractBatch, contract, {timeout: timeout});
                return handleResponse(promise);
            },
            effectiveContract: function (id) {
                var url = Url.effectiveContract.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            getContractInfoList: function (projId) {
                var url = Url.getContractInfoList.replace(/{projId}/, projId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 业务合同 新增 参数：项目id
            ,
            getBizContractInfoByProjId: function (projId) {
                var url = Url.getBizContractInfoByProjIdUrl.replace(/{projId}/, projId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 业务合同 新增 参数：框架合同id
            ,
            getBizContractInfoByFrameId: function (frameId) {
                var url = Url.getBizContractInfoByFrameIdUrl.replace(/{contractId}/, frameId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 业务合同 查看/编辑  参数：业务合同的id
            ,
            getBizContractInfoDetail: function (id) {
                var url = Url.getBizContractInfoInfoByContIdUrl.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 业务合同 切换业务范畴(框架合同) 参数： 项目id,业务范畴,框架合同id
            ,
            retrieveCustomer: function (projId, busiCate, contractId) {
                var url = Url.getBizContractInfoAddUrl.replace(/{projId}/, projId).replace(/{busiCate}/, busiCate).replace(/{contractId}/, contractId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 业务合同 切换合同类型，查询合同模板 参数： 项目id,业务范畴
            ,
            retrieveContractTemplate: function (projId, busiCate, contractId) {
                var url = Url.getBizContractInfoTemplateUrl.replace(/{projId}/, projId).replace(/{busiCate}/, busiCate).replace(/{contractId}/, contractId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 业务合同 保存  参数：业务合同info
            ,
            saveBizContract: function (contract) {
                var promise = $http.post(Url.doBizContractInfoSaveUrl, contract, {timeout: timeout});
                return handleResponse(promise);
            }
            // 业务合同 提交 审批  参数：业务合同info
            ,
            aprovalBizContract: function (contract) {
                var promise = $http.post(Url.doBizContractInfoSubmitUrl, contract, {timeout: timeout});
                return handleResponse(promise);
            }
            // 业务合同 服务启动  参数：业务合同的id
            ,
            bizContractServiceStart: function (contId) {
                var url = Url.doBizContractServiceStartUrl.replace(/{id}/, contId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 业务合同 合同生效  参数：业务合同的id
            ,
            effectiveBizContract: function (contId) {
                var url = Url.doBizContractEffectUrl.replace(/{id}/, contId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            // 报价单打印
            quotationPrinting: function (isSplit, id) {
                var url = Url.quotationPrintingUrl.replace(/{isSplit}/, isSplit).replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //合同打印
            contractPrinting: function (isSingle, id, languages, custId) {
                var url = Url.contractPrintingUrl.replace(/{isSingle}/, isSingle).replace(/{id}/, id).replace(/{languages}/, languages).replace(/{custId}/, custId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            //附件合同打印申请状态
            ,
            updateExtInfoToPrintStatus: function (contId) {
                var url = Url.updateExtInfoToPrintStatusUrl.replace(/{id}/, contId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            //附件合同打印已打印
            ,
            updateExtInfoToPrintStatusFinish: function (contId) {
                var url = Url.updateExtInfoToPrintStatusFinishUrl.replace(/{id}/, contId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            //业务合同打印申请状态
            ,
            updateBizInfoToPrintStatus: function (contId) {
                var url = Url.updateBizInfoToPrintStatusUrl.replace(/{id}/, contId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            //业务合同打印已打印
            ,
            updateBInfoToPrintStatusFinish: function (contId) {
                var url = Url.updateBizInfoToPrintStatusFinishUrl.replace(/{id}/, contId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            //框架合同打印申请状态
            ,
            updateInfoToPrintStatus: function (contId) {
                var url = Url.updateInfoToPrintStatusUrl.replace(/{id}/, contId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            //框架合同打印已打印
            ,
            updateInfoToPrintStatusFinish: function (contId) {
                var url = Url.updateInfoToPrintStatusFinishUrl.replace(/{id}/, contId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 合同打印申请
            ,
            saveApply: function (contract) {
                var promise = $http.post(Url.saveApplyUrl, contract, {timeout: timeout});
                return handleResponse(promise);
            }
            //合同打印申请获取
            ,
            getApplyDetail: function (id) {
                var url = Url.getApplyDetailUrl.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 协议(合同附件) 项目上新增 参数：项目id
            ,
            getAttContractInfoByProjId: function (projId) {
                var url = Url.getAttContractInfoByProjIdUrl.replace(/{projId}/, projId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 协议(合同附件) 框架合同上新增 参数：框架合同id
            ,
            getAttContractInfoByFreContId: function (contractId) {
                var url = Url.getAttContractInfoByFreContIdUrl.replace(/{contractId}/, contractId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 协议(合同附件) 业务合同上新增 参数：业务合同id
            ,
            getAttContractInfoByBizContId: function (contractId) {
                var url = Url.getAttContractInfoByBizContIdUrl.replace(/{bizId}/, contractId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 协议(合同附件) 查看/编辑  参数：合同附件的id
            ,
            getAttContractInfoDetail: function (id) {
                var url = Url.getAttContractInfoInfoByContIdUrl.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 协议(合同附件) 切换框架合同时查询客户  参数：框架合同的id
            ,
            getFrameContractCustomerList: function (contractId) {
                var url = Url.getFrameContractCustomerUrl.replace(/{contractId}/, contractId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 协议(合同附件) 保存  参数：合同info
            ,
            saveAttContract: function (contract) {
                var promise = $http.post(Url.doAttContractInfoSaveUrl, contract, {timeout: timeout});
                return handleResponse(promise);
            }
            // 协议(合同附件) 提交 审批  参数：合同info
            ,
            aprovalAttContract: function (contract) {
                var promise = $http.post(Url.doAttContractInfoSubmitUrl, contract, {timeout: timeout});
                return handleResponse(promise);
            }
            // 协议(合同附件) 服务启动  参数：合同的id
            ,
            attContractServiceStart: function (contId) {
                var url = Url.doAttContractServiceStartUrl.replace(/{id}/, contId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            // 协议(合同附件) 合同生效  参数：合同的id
            ,
            effectiveAttContract: function (contId) {
                var url = Url.doAttContractEffectUrl.replace(/{id}/, contId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //合同模板 保存
            saveContractTemplate: function (contract) {
                var promise = $http.post(Url.saveContractTemplate, contract, {timeout: timeout});
                return handleResponse(promise);
            },
            //合同模板 启用
            useContractTemplate: function (contract) {
                var promise = $http.post(Url.useContractTemplate, contract, {timeout: timeout});
                return handleResponse(promise);
            },
            //合同模板 查询
            getContractTemplateById: function (contId) {
                var url = Url.getContractTemplateById.replace(/{id}/, contId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //合同模板 停用
            updateContractTemplateStatus: function (contId) {
                var url = Url.updateContractTemplateStatus.replace(/{id}/, contId);
                var promise = $http.post(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //合同模板列表 查询
            getTemplateList: function (request) {
                var url = Url.getTemplateListUrl + "?" + request;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取公共项目
            getPublicProj: function (request) {
                var url = Url.getPublicProjUrl + "?" + request;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            createContractTemplate: function (id) {
                var url = Url.createContractTemplate.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            // 根据选择的所属合同类型查询可选的所属合同列表
            findContractInfosByParams: function (projId, contractCategory) {
                var url = Url.findContractInfosByParamsUrl.replace(/{projId}/, projId).replace(/{contractCategory}/, contractCategory);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            // ---↑↑合同↑↑-- //
            //获取产品颗粒列表 hexiang
            getProdBaseList: function (options) {
                var url = Url.prodKernel;
                var first = true;
                for (var key in options) {
                    if (first) {
                        url += "?" + key + "=" + options[key];
                        first = false;
                    } else
                        url += "&" + key + "=" + options[key];
                }
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /**获取产品颗粒下的产品配置项 hexiang*/
            getProdConfigOption: function (id) {
                var promise = $http.get(Url.prodConfigOption + id, {timeout: timeout});
                return handleResponse(promise);
            },
            /**管理方模糊查询 zhangmm*/
            getManageByName: function (name) {
                //var url = Url.getManageByNameUrl + "/" + name;
                //var promise = $http.get(url, {timeout: timeout});
                //return handleResponse(promise);
                var url = Url.getManageByNameUrl.replace(/{name}/, name);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /**下载合同 zhangmm*/
            downloadContract: function (options) {

                var url = Url.downloadContractUrl;
                url += "/" + options;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            // ---↓↓公共联系人↓↓-- //
            //公共联系人列表 查询
            getPublicContactList: function (request) {
                if (request != null)
                    var url = Url.getPublicContactListUrl + "?" + request;
                else
                    var url = Url.getPublicContactListUrl;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //公共联系人 查询
            getPublicContactById: function (linkmanId) {
                var url = Url.getPublicContactByIdUrl.replace(/{linkmanId}/, linkmanId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //公共联系人 查询
            getAccountPublicContactById: function (request) {
                var url = Url.getAccountPublicContactByIdUrl + "?" + request;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            // ---↑↑公共联系人↑↑-- //
            // ---↓↓负面清单↓↓-- //
            /**服务项目组模糊查询 zhangmm*/
            getServItemGroupByName: function (name) {
                var url = Url.getServGroupListByName + "/" + name;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /**通过服务项目组检索项目 zhangmm*/
            getServeProListByBaseProdId: function (id) {

                var url = Url.getServeProListByBaseProdId + "/" + id;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /**负面清单列表查询 pangjs*/
            getNegativeLists: function (request) {
                var url = Url.getNegativeListsUrl + "?" + request;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /**负面清单查询详细 编辑*/
            getInfoById: function (id) {
                var url = Url.getInfoByIdUrl.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /**负面清单新增*/
            addNegative: function (negativeList) {
                var promise = $http.post(Url.addNegativeUrl, negativeList, {timeout: timeout});
                return handleResponse(promise);
            },
            /**负面清单停用*/
            updateInfoToStop: function (negaId) {
                var url = Url.updateInfoToStopUrl.replace(/{id}/, negaId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /**负面清单启用*/
            addNegativeListToApproval: function (negativeList) {
                var promise = $http.post(Url.addNegativeListToApproval, negativeList, {timeout: timeout});
                return handleResponse(promise);
            },
            /**提交产品颗粒下的产品配置项 hexiang */
            postProdConfigOption: function (id, configlist) {
                var promise = $http.post(Url.prodConfigOption + id, configlist, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取产品颗粒下的配置组
            getProdConfigGroup: function (id) {
                var promise = $http.get(Url.prodConfigGroup + id);
                return handleResponse(promise);
            },
            saveEmployeeOption: function (config) {
                var promise = $http.post(Url.employeeConfig, config, {timeout: timeout})
                return handleResponse(promise);
            },
            getEmployeeOption: function (id) {
                var promise = $http.get(Url.employeeConfig + "/" + id, {timeout: timeout})
                return handleResponse(promise);
            },
            /* 雇员组 */
            getEmployeeGroup: function (id) {
                var promise = $http.get(Url.getEmployeeGroup + "/" + id, {timeout: timeout});
                return handleResponse(promise);
            },
            postEmployeeGroup: function (data) {
                var promise = $http.post(Url.getEmployeeGroup, data, {timeout: timeout});
                return handleResponse(promise);
            },
            getEmployeeGroupOption: function (id) {
                var promise = $http.get(Url.employeeConfig + "/all/" + id, {timeout: timeout});
                return handleResponse(promise);
            },
            /**根据cityId查找城市 */
            getCityById: function (cityId) {
                var promise = $http.get(Url.city + "/" + cityId, {timeout: timeout});
                return handleResponse(promise);
            },
            getApprostreamInfo: function (approParam) {
                var promise = $http.post(Url.getApprovalFlow, approParam, {timeout: timeout});
                return handleResponse(promise);
            },
            //根据产品颗粒id和服务项目id获取服务配置项
            getConfigItemByKernelAndServeItem: function (baseProdId, servItemId) {
                var promise = $http.get(Url.configoptionByKernelIdAndServeItemId + "?baseProdId=" + baseProdId + "&servItemId=" + servItemId, {timeout: timeout});
                return handleResponse(promise);
            },
            //雇员沟通列表

            getLinkList: function (options) {

                var promise = $http.get(Url.LinkList + "?" + options, {timeout: timeout});
                return handleResponse(promise);
            },
            //雇员沟通列表按人员搜索
            getSearchPerson: function (name, custId) {
                var promise = $http.get(Url.employeeSearchDeil + "search/list" + "?empName=" + name + "&custId=" + custId, {timeout: timeout});
                return handleResponse(promise);
            },

            //雇员沟通记录详情
            getEmployeeCommunicateDeil: function (communicateId) {
                //console.log(Url.employeeDeil+communicateId);
                var promise = $http.get(Url.employeeDeil + communicateId, {timeout: timeout});
                return handleResponse(promise);
            },


            //雇员沟通列表按职位搜索
            getSearchPosition: function (position, custId) {
                var promise = $http.get(Url.employeeSearchDeil + "search/list" + "?workPosition=" + position + "&custId=" + custId, {timeout: timeout});
                return handleResponse(promise);
            },
            //保存产品颗粒下的配置组
            postConfigGroup: function (baseProdId, body) {
                var promise = $http.post(Url.prodConfigGroup + baseProdId, body, {timeout: timeout});
                return handleResponse(promise);
            },
            // ---↑↑负面清单↑↑-- //
            // ---↓↓OC002 OC003 OC004↓↓-- //
            /**雇员列表查询 pangjs*/
            getEmployeeList: function (request) {
                var url = Url.getEmployeeListUrl + "?" + request;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //雇员编辑个人
            getEmployeeCapacityData: function (id) {
                var url = Url.getEmployeeCapacityDataUrl.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //雇员编辑企业
            getEmployeeInfoCapacity: function (empId) {
                var url = Url.getEmployeeInfoCapacityUrl.replace(/{empId}/, empId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //雇员新增 初始化数据
            getEmployeeConfigInfoByCustId: function (custId) {
                var url = Url.getAddEmployeeInitDataUrl.replace(/{custId}/, custId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取现有雇员，客户下联系人
            getEmpCommunicateEmailInfo: function (empId) {
                var url = Url.getEmpCommunicateEmailInfo.replace(/{empId}/, empId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //根据已输入的新增雇员信息自动匹配产品组和雇员组
            getEmGroupAndProductByEmpInfo: function (employee) {
                var promise = $http.post(Url.getEmGroupAndProductUrl, employee, {timeout: timeout});
                return handleResponse(promise);
            },
            //根据现有的雇员信息自动匹配产品组和雇员组
            getGroupAndProductList: function (id) {
                var promise = $http.get(Url.getGroupAndProductListUrl.replace(/{id}/, id), {timeout: timeout});
                return handleResponse(promise);
                //var url = Url.getGroupAndProductListUrl.replace(/{id}/, id);
                //var promise = $http.get(url, {timeout: timeout});
                //return handleResponse(promise);
            },
            //雇员编辑查看
            getEmployeeSerInfo: function (id) {
                var url = Url.getEmployeeSerInfoUrl.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //查看页面生效
            effectiveServListStatus: function (employee) {
                var promise = $http.post(Url.effectiveServListStatusUrl, employee, {timeout: timeout});
                return handleResponse(promise);
            },
            //雇员服务生效
            effectiveEmployeeServList: function (employee) {
                var promise = $http.post(Url.effectiveEmployeeServListUrl, employee, {timeout: timeout});
                return handleResponse(promise);
            },
            //雇员服务变更
            variationEmployeeServList: function (employee) {
                var promise = $http.post(Url.variationEmployeeServListUrl, employee, {timeout: timeout});
                return handleResponse(promise);
            },
            //雇员新增生效
            effecitiveEmployeeInfo: function (employee) {
                var promise = $http.post(Url.effecitiveEmployeeInfoUrl, employee, {timeout: timeout});
                return handleResponse(promise);
            },
            //根据证件类型以及证件号取得雇员的部分身份信息
            getEmpInfoByIdNo: function (idTypeCode, idNo) {
                var url = Url.getEmployeeInfoByIdCodeUrl.replace(/{idTypeCode}/, idTypeCode).replace(/{idNo}/, idNo);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //雇员新增保存
            doAddEmployeeInfo: function (employee) {
                var promise = $http.post(Url.addEmployeeUrl, employee, {timeout: timeout});
                return handleResponse(promise);
            },
            //雇员编辑保存
            updateEmployeeServList: function (employee) {
                var promise = $http.post(Url.updateEmployeeServListUrl, employee, {timeout: timeout});
                return handleResponse(promise);
            },
            //校验雇员工号是否唯一性
            doCheckEmployeeWorkNumber: function (workNumber, custId, versionId) {
                var url = Url.checkEmployeeWorkNumberUrl.replace(/{workNumber}/, workNumber).replace(/{custId}/, custId).replace(/{versionId}/, versionId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //根据城市id获得城市信息
            getCityInfoByCityId: function (cityIds) {
                var url = Url.getCityInfoByIdUrl.replace(/{cityIds}/, cityIds);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            /**雇员编辑保存*/
            saveEmployeeInfoCapacity: function (employee) {
                var promise = $http.post(Url.saveEmployeeInfoCapacityUrl, employee, {timeout: timeout});
                return handleResponse(promise);
            },
            getEmployeeSupplementCertificateLogList: function (verId, id) {
                var url = Url.getEmployeeSupplementCertificateLogList.replace(/{versionId}/, verId).replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            getEmployeeFamilyMembersLogList: function (verId, id) {
                var url = Url.getEmployeeFamilyMembersLogList.replace(/{versionId}/, verId).replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            getEmployeeEducationExperienceLogList: function (verId, id) {
                var url = Url.getEmployeeEducationExperienceLogList.replace(/{versionId}/, verId).replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            getCorporateLogList: function (colName, verId, version) {
                var url = Url.getCorporateLogList.replace(/{value}/, colName).replace(/{versionId}/, verId).replace(/{version}/, version);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            // 取得变更履历
            getEmployeeInfoCapacityLogList: function (colName, verId, version) {
                var url = Url.employeeInfoCapacityLogList.replace(/{value}/, colName).replace(/{versionId}/, verId).replace(/{version}/, version);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            // ---↑↑OC002 OC003 OC004↑↑-- //
            // ----↓↓获取国家列表↓↓--- //
            getCountryListByName: function (countryName) {
                var url = Url.getCountryListUrl + countryName;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            // ----↑↑获取国家列表↑↑--- //
            //获取配置组详情 hexiang
            getConfigGroupDetail: function (confGrpId) {
                var url = Url.configGroup.replace("{confGrpId}", confGrpId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //根据报价单id获取服务清单
            getServeListByQuoteId: function (quoteId) {
                var url = Url.serveList.replace("{quoteId}", quoteId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //服务清单列表模糊查询
            getServiceListSearch: function (managingId, quotName) {
                var url = Url.getServiceList.replace("{managingId}", managingId) + "?quotName=" + quotName;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取服务清单列表
            getServiceList: function (managingId) {
                var url = Url.getServiceList.replace("{managingId}", managingId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取服务清单详情
            getServiceListDetail: function (quoteId) {
                var url = Url.getServiceListDetail.replace("{quoteId}", quoteId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },

            //根据产品颗粒id获取负面清单
            getNegativeListByProdbase: function (ids, cityids) {
                var strprod = "";
                var strcity = "";
                for (var i = 0; i < ids.length; i++) {
                    if (i == 0)
                        strprod += ids[i];
                    else
                        strprod += "," + ids[i];
                }
                for (var i = 0; i < cityids.length; i++) {
                    if (i == 0)
                        strcity += cityids[i];
                    else
                        strcity += "," + cityids[i];
                }

                var url = Url.negativeListByProdbase.replace("{baseProdId}", strprod).replace("{cityId}", strcity);
                var promise = $http.get(url);
                return handleResponse(promise);
            },
            //获取指定城市的规则仓库
            getRuleRepositoryListByCityId: function (cityId) {
                var url = Url.ruleRepositoryOfCity.replace("{cityId}", cityId);
                var promise = $http.get(url);
                return handleResponse(promise);
            },

            //获取服务清单历史记录
            getServiceListHistory: function (historyParam) {
                var url = Url.getServiceListHistory + "?" + historyParam;
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },

            //获取客户模板列表
            getLegalEntityTemplateList: function (id) {
                var url = Url.LegalEntityTemplateList.replace(/{custID}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
            //获取非五险一金详细版本数据
            ,
            getLegalEntityProd: function (id, year) {
                var url = [Url.LegalEntityTemplateList.replace(/{custID}/, id), '/', year].join('');
                return handleResponse(
                    $http.get(url, {timeout: timeout})
                );
            }
            //获取客户模板列表
            , getemployeeTemplateList: function (empid) {
                var url = Url.employeeTemplateList.replace(/{id}/, empid);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            getemployeeTemplate: function (id) {
                var url = Url.employeeTemplate.replace(/{id}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取机构列表根据城市id
            getAgencyListById: function (cityId) {
                var url = Url.agencylistofCity.replace("{cityId}", cityId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取规则列表根据规则仓库类型，城市，机构
            //当类型为政策时，需要城市id cityId 和类型ruleRepositoryType
            //当类型为机构时，需要城市id cityId,机构id serviceAgencyId,类型ruleRepositoryType
            getRuleListByRepCityAgency: function (params) {
                var url = Url.rulelist + "?";
                for (var key in params) {
                    url += key + "=" + params[key] + "&";
                }
                var url = url.substring(0, url.length - 1);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //根据规则仓库id获取规则详情
            getRegDetailByRegId: function (regRepoId) {
                var url = Url.ruleDetail.replace("{ruleRepoId}", regRepoId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //保存服务清单
            saveServeList: function (status, body) {
                console.log(status,body);
                var url = Url.saveServeList.replace("{status}", status);
                var promise = $http.post(url, body, {timeout: timeout});
                return handleResponse(promise);
            },
            //根据规则仓库id获取规则仓库详情
            getReguRepoDetail: function (repoId) {
                var url = Url.reguRepoDetail.replace("{ruleRepoId}", repoId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取有规则仓库的所有城市
            getCityHasRegulation: function () {
                var promise = $http.get(Url.cityHasRegu, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取报价单下的所有客户
            getClientUnderQuote: function (quoteId) {
                var url = Url.clientUnderQuote.replace("{quotId}", quoteId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //服务清单产品配置校验及获取
            getProdConfigInServList: function (baseProductId, serviceItemId, configs) {
                var url = Url.serveListProdConfig.replace("{baseProductId}", baseProductId);
                url = url.replace("{serviceItemId}", serviceItemId);
                var promise = $http.post(url, configs, {timeout: timeout});
                return handleResponse(promise);
            },
            /**获取产品的依赖关系 */
            getProdDepend: function (prods) {
                var promise = $http.post(Url.prodDependency, prods, {timeout: timeout});
                return handleResponse(promise);
            },
            //改变配置组状态
            changeConfGrpStatus: function (grpId, status) {
                var url = Url.confGrpStatus.replace("{confGrpId}", grpId);
                var promise = $http.post(url, {status: status}, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取雇员模板五险一金数据1
            getEmpFiveInsuranceData: function (empServListItemCode, month) {
                return handleResponse($http
                    .get([Url.getEmpFiveInsurance, empServListItemCode, '?month=', month].join(''), {timeout: timeout}));
            }
            ,//获取雇员模板五险一金历史对比数据
            getEmpFiveInsuranceDiff: function (empServListItemCode, month) {
                return handleResponse(
                    $http.get([Url.getEmpFiveInsuranceDiff, "?empServListItemCode=", empServListItemCode, "&month=", month].join('')));
            },
            //获取最新版本的规则仓库
            getLatestRepoVersion: function (ruleRepoId) {
                var url = Url.repoLatestVersion.replace("{ruleRepoId}", ruleRepoId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            ////获取公共项目
            //getPublicProj:function(options){
            //    var url=Url.publicProj;
            //    if(options!=null){
            //        var keys=Object.getOwnPropertyNames(options);
            //        if(keys.length>0){
            //            url+="?";
            //            for(var i=0;i<keys.length;i++){
            //                url+=keys[i]+"="+options[keys[i]];
            //                if(i<keys.length-1){
            //                    url+="&";
            //                }
            //            }
            //        }
            //    }
            //    var promise=$http.get(url,{timeout:timeout});
            //    return handleResponse(promise);
            //},
            //获取行业大类
            getIndustryCategroy: function () {
                var promise = $http.get(Url.industry + "/categories", {timeout: timeout});
                return handleResponse(promise);
            },
            //获取行业小类
            getIndustrySubcategroy: function (id) {
                var promise = $http.get(Url.industry + "/" + id + "/subcategories", {timeout: timeout});
                return handleResponse(promise);
            },
            //检查客户编码唯一性
            checkUniqueCode: function (data) {
                var url = Url.customer + "/checkCustomerLicense";
                var promise = $http.post(url, data, {timeout: timeout});
                return handleResponse(promise);
            },
            // 更改客户状态
            updateCustStatus: function (id, status) {
                var url = Url.updateCustStatus.replace("{id}", id).replace("{status}", status);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //从产品里面拿服务选项（服务清单用）
            getServeOptionFromProd: function (quoteId, prodId, prodType) {
                var url = Url.serveOptionFromProd.replace("{quoteId}", quoteId).replace("{prodId}", prodId).replace("{prodType}", prodType);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //权限这块
            //回收委托
            recycleAccessEntrust:function (id) {
                var promise = $http.get(Url.recycleAccessEntrust + id, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取委托
            getAccessEntrust: function (id) {
                var promise = $http.get(Url.accessEntrust + id, {timeout: timeout});
                return handleResponse(promise);
            },
            //新增委托
            addAccessEntrust: function (data) {
                var promise = $http.post(Url.addAccessEntrust, data, {timeout: timeout});
                return handleResponse(promise);
            },
            //查询委托列表
            queryDelegateRecordList: function (data) {
                var promise = $http.post(Url.queryDelegateRecordList, data, {timeout: timeout});
                return handleResponse(promise);
            },
            //查看资源
            getResourceList: function (id) {
                var url = Url.getResource.replace(':id', id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //新增资源委托
            addResource : function(resource){
                var promise = $http.post(Url.addResource ,resource , {timeout : timeout} );
                return handleResponse(promise);
            },
            //查看资源委托列表
            resourceList : function(params){
                var promise = $http.post(Url.getResourceList ,params , {timeout : timeout});
                return handleResponse(promise);
            },
            //查看委托资源详情
            resourceDetail : function(id){
                var url = Url.resourceDetail.replace(':id',id)
                var promise =  $http.get(url, {timeout : timeout});
                return handleResponse(promise);
            },
            //回收委托资源
            recoveryResource : function(id){
                var url = Url.recoveryResource.replace(':id',id);
                var promise = $http.get(url , {timeout : timeout});
                return handleResponse(promise);
            },
            getTreeOfUsers : function(){
                var promise = $http.get(Url.getTreeOfUser , {timeout : timeout});
                return handleResponse(promise);
            },
            //
            //getTreeOfUsers: function () {
            //    console.log(Url);
            //    var promise = $http.get(Url.getTreeOfUsers, {timeout: timeout});
            //    return handleResponse(promise);
            //},
            serviceGet: function (url) {
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            servicePost: function (url, data) {
                var promise = $http.post(url, data, {timeout: timeout});
                return handleResponse(promise);
            },
            // 管理方合并
            manageMerge:function(data){
                var promise = $http.post(Url.manageMerge, data, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取客户下面的产品，冻结项目或者管理方需要
            getProdUnderClient:function(custId){
                var url=Url.prodUnderClient.replace("{custId}",custId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取客户下面的产品，终止项目和管理方需要
            getProdUnderClientEnd:function(custId){
                var url=Url.prodUnderClientEnd.replace("{custId}",custId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //提交冻结项目
            saveFrozenProd:function(data){
                var promise = $http.post(Url.saveFrozenProd,data, {timeout: timeout});
                return handleResponse(promise);
            },
            //客户终止
            getCustomerEnd:function(custId){
                var url=Url.customerEnd.replace("{custId}",custId);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            },
            //客户终止
            saveCustomerEnd:function(data){
                var promise = $http.post(Url.saveCustomerEnd,data, {timeout: timeout});
                return handleResponse(promise);
            },
            //管理方终止
            endMange:function(data){
                var promise = $http.post(Url.manageEnd,data, {timeout: timeout});
                return handleResponse(promise);
            },
            //管理方冻结
            frozenManage:function(data){
                var promise = $http.post(Url.manageFrozen,data, {timeout: timeout});
                return handleResponse(promise);
            },
            //管理方冻结启用信息获取
            unfrozenManageInfo:function(manageid){
                var url=Url.manageUnFrozenInfo.replace("{managingId}",manageid);
                var promise=$http.get(url,{timeout:timeout});
                return handleResponse(promise);
            },
            //管理方冻结启用提交
            unfrozenManage:function(data){
                var promise=$http.post(Url.manageUnFrozen,data,{timeout:timeout});
                return handleResponse(promise);
            },
            //客户冻结延期
            customerFreezeDelay:function(data){
                var promise = $http.post(Url.customerFreezeDelay,data, {timeout: timeout});
                return handleResponse(promise);
            },
            //管理方终止启用
            unEndManage:function(data){
                var promise = $http.post(Url.manageUnEnd,data, {timeout: timeout});
                return handleResponse(promise);
            },
            //获取变更管理方列表
            changeCustomerManagerList:function(mid){
                var promise = $http.get(Url.changeCustomerManagerList+mid,{timeout: timeout});
                return handleResponse(promise);
            },
            //变更管理方
            changeCustomerManager:function(mid,cid,mname){
                var post={
                    managingId:mid,
                    managingName:mname,
                    custId:cid
                };
                var promise = $http.post(Url.changeCustomerManager,post,{timeout: timeout});
                return handleResponse(promise);
            },
            //客户终止启用
            stopCustomerToStart:function(data){
                var promise = $http.post(Url.stopCustomerToStart,data, {timeout: timeout});
                return handleResponse(promise);
            },
            //客户冻结启用
            forzenRestartCustomer:function(data){
                var promise = $http.post(Url.forzenRestartCustomer,data,{timeout: timeout});
                return handleResponse(promise);
            },
            //客户终止启用时查询客户已终止的产品
            getHadFrozenCustProducts:function(cid){
                var promise = $http.get(Url.getHadFrozenCustProducts+cid,{timeout: timeout});
                return handleResponse(promise);
            },
            //管理方终止，冻结等等的审批流,type==1 冻结启用 type==2终止启用 管理方拆分3 合并4
            getManageApproveFlow:function(manageid,type){
                if(type==1)
                    var data={
                        objectId:manageid,
                        objectType:"100100107",//hard code，二级分类，代表是管理方审批
                        formGrandChildType:"100100107102"//hard code，三级分类，代表是管理方合并审批
                    };
                if(type==2)
                    var data={
                        objectId:manageid,
                        objectType:"100100107",//hard code，二级分类，代表是管理方审批
                        formGrandChildType:"100100107103"//hard code，三级分类，代表是管理方合并审批
                    };
                if(type==3)
                    var data={
                        "objectId":manageid, //管理方ID
                        "objectType":"100100107",//hard code，二级分类，代表是管理方审批
                        "formGrandChildType":"100100107101"//hard code，三级分类，代表是管理方分拆审批
                    };
                if(type==4)
                    var data={
                            "objectId":manageid, //管理方ID
                            "objectType":"100100107",//hard code，二级分类，代表是管理方审批
                            "formGrandChildType":"100100107100"//hard code，三级分类，代表是管理方合并审批
                    };
                var promise = $http.post(Url.manageApproveFlow,data,{timeout: timeout});
                return handleResponse(promise);
            },
            //搜索用户
            searchUser:function(name){
                var url=Url.searchUser+"?userName="+name;
                var promise=$http.get(url);
                return handleResponse(promise);
            },
            //拆分管理方
            splitManage:function(data){
                var promise = $http.post(Url.manageSplit,data,{timeout: timeout});
                return handleResponse(promise);
            },
            //获取管理方下的咨询顾问
            consultants:function(manageid){
                var url=Url.consultants.replace("{id}",manageid);
                var promise = $http.get(url,{timeout: timeout});
                return handleResponse(promise);
            },
            //价格的服务选项
            priceServOption:function(quoteId,prodId,prodType){
                var url=Url.priceServOption.replace("{quoteId}",quoteId);
                url=url.replace("{prodId}",prodId);
                url=url.replace("{prodType}",prodType);
                var promise = $http.get(url,{timeout: timeout});
                return handleResponse(promise);
            },
            //配置项
            confServOption:function(quoteId,prodId,prodType){
                var url=Url.confServOption.replace("{quoteId}",quoteId);
                url=url.replace("{prodId}",prodId);
                url=url.replace("{prodType}",prodType);
                var promise = $http.get(url,{timeout: timeout});
                return handleResponse(promise);
            },
            //系统时间
            time:function(){
                var promise = $http.get(Url.time,{timeout: timeout});
                return handleResponse(promise);
            },
            changableCust:function(manageId){
                var url=Url.changableCust.replace("{managingId}",manageId);
                var promise = $http.get(url,{timeout: timeout});
                return handleResponse(promise);
            },
            /** 设置默认规则 */
            regulationToStop: function (id) {
                var url = Url.regulationToStop.replace(/{ruleRepositoryId}/, id);
                var promise = $http.get(url, {timeout: timeout});
                return handleResponse(promise);
            }
        };
        //调用弹出层
        //注意，必须保证returnedObj的对象的函数里面，必须返回handleResponse对象。
        //这样才能保证加载层能够被正常关闭。
        //如果有不需要弹出层的方法，请将方法名称添加到下面的数组中，例子代码如下
        // var excludedMethodNames = ['getLatestRepoVersion'];
        var excludedMethodNames = ['getServItemGroupByName', 'getManageByName', 'getEmployeeInfoCapacityLogList', 'getEmployeeSupplementCertificateLogList', 'getCorporateLogList', 'getServeProListByBaseProdId', 'getComDitcDataWidthCache', 'getMagmtSearch', 'checkUniqueCode', 'getIndustryCategroy', 'getIndustrySubcategroy', 'getPublicContactList', 'getProdDepend', 'getClientUnderQuote', 'getServeOptionFromProd', 'priceServOption', 'confServOption', 'getCityById',
        'getRuleRepositoryListByCityId', 'getCityHasRegulation', 'getComDitcData'];
        return wraploading.wrap(returnedObj, excludedMethodNames);
    }])
    .factory('Url', [function () {
         //var host="http://15.107.49.234:8090";//祖伟电脑;
        // var host="http://15.107.49.194"//王鹏电脑
        // var host="http://15.107.35.51:8080"//宝宝电脑
        //var host="http://15.107.34.91:8080"//chris电脑
        //var host="/g1/service";//开发服务器可用;
        // var host="http://16.168.7.206:8080";//祖伟电脑;
         var host="http://15.114.116.184/g1/service";//开发服务器可用;
        // var http://dtserver.cn.hpecorp.net/g1/app/
        // var host =""//zqh在webpack匹配,不用本地
        // var attachHost ="http://15.114.116.184/g1/service";
        // var attachHost ="http://15.114.116.192/g1/service";
         var host ="http://localhost:8080"
        //var host="http://localhost:9080"
        // var host="http://localhost:8090"
        var path="/af/salesmgmt/rest";//开发环境
          var path="/salesmgmt/rest";//开发电脑
        var approvalpath = "/common/internalcomm/approvalflow/rest";
        return {
            //树
            getTreeOfUser : "orgman/conf/getBaseTreeForResource?resourceTypeId=resUser",
            //回收资源委托
            recoveryResource : host + path + "/sourceDelegateService/unDelegation/:id",
            //资源委托详情
            resourceDetail : host + path + "/sourceDelegateService/findDelegation/:id",
            //资源委托list
            getResourceList : host + path + "/sourceDelegateService/queryDelegationList",
            //新增资源委托
            addResource : host + path + "/sourceDelegateService/addDelegation",
            //查看资源
            getResource: host + path + "/sourceDelegateService/findSource/:id",
            //权限委托
            accessEntrust: host + approvalpath + "/backUpRestService/findDelegateDetail/",
            //新增权限委托
            addAccessEntrust: host + path + "/delegateService/addDelegation",
            //回收委托
            recycleAccessEntrust: host + approvalpath + "/backUpRestService/unDelegate/",
            //权限委托列表
            queryDelegateRecordList: host + approvalpath + "/backUpRestService/queryDelegateRecordList",

            //获取资源分派列表
            queryAssignmentList: host + path + "/assignmentService/queryAssignmentList",
            //增加资源分派
            addAssignment: host + path + "/assignmentService/addAssignment",
            //查找资源分派
            findAssignment: host + path + "/assignmentService/findAssignment/",
            //获取用户树
            getTreeOfUsers: "/orgman/conf/getBaseTreeForResource?resourceTypeId=resUser",
            //=========↑↑委托管理↑↑===========

            //获取单据的审批意见
            getApprovalFlow: host + approvalpath + "/approvalFlow/findCommentsByObjectId",
            //获取服务清单历史记录
            getServiceListHistory: host + path + "/custserv/servlist/templateversions",
            //获取服务清单列表
            getServiceList: host + path + "/custserv/servlist/{managingId}",
            //获取服务清单详情
            getServiceListDetail: host + path + "/custserv/servlist/viewtemplates/{quoteId}",
            //临时审批开关控制接口
            approvalFlowSwitch: host + path + "/project/process/dev",
            //数据字典
            dictData: host + path + "/datadict",
            //常用城市调用接口
            commonCity: host + path + "/city/commonly",
            //报价单省会直辖市城市调用接口
            provinceCity: host + path + "/city/rulerepo",
            //报价单非省会直辖市城市模糊搜索调用接口
            nonProvinceCity: host + path + "/city/rulerepo?cityName=",
            //普通城市调用接口
            unCommonCity: host + path + "/city/uncommonly?cityName=",
            //管理方 restful
            manage: host + path + "/managing",
            ////管理方详细信息
            manageDetail: host + path + "/managing/{id}",
            //管理方和客户列表
            managecustomer: host + path + "/managing/managingcustomer",
            //管理方下项目 restful
            manageProject: host + path + "/managing/{id}/project",
            //项目 restful
            project: host + path + "/project",
            //客户 restful
            customer: host + path + "/customer",

            //行业
            industry: host + path + "/industry",

            //新增客户编码
            newcustomercode: host + path + "/customer/code",
            //操作模式
            originopmode: host + path + "/customer/originopmode?_type=json",
            //联系人 restful
            person: host + path + "/managing/person",
            //联系人电话唯一性校验
            ContactPhone: host + path + "/project/checkPhoneNumber/{phoneType}/{phoneNumber} ",
            //管理方下的联系人
            personOfManage: host + path + "/managing/{id}/person",
            //管理方下联系人删除时项目关联
            personProject: host + path + "/managing/checkProjectOfPerson/",
            //联系人电话类型
            contactPhoneType: host + path + "/managing/person/phoneTypes",
            //项目类别列表
            optionpropertytype: host + path + "/datadict/optionpropertytype",
            //配置信息
            employeeConfig: host + path + '/employee/option',
            //组织结构树
            org: host + path + "/org",
            //管理方下的客户
            customers: host + path + "/managing/{id}/customer",
            //查询业务范畴
            busiCate: host + path + "/project/bizcategory",
            //项目查询业务范畴
            projectBusiCate: host + path + "/datadict/117",
            //单项产品查询业务范畴
            prodSingleBusiCate: host + path + "/datadict/116",
            //基础产品 修改 多语言
            prodLanguage: host + path + "/prodBase/lan/multilanguage",
            //可售单项 修改 多语言
            prodOfferLanguage: host + path + "/prodOffer/lan/multilanguage",
            //价格历史
            prodOfferPricehisotry: host + path + "/prodOffer/pricehistory",
            //成本历史
            prodOfferCosthisotry: host + path + "/prodOffer/costhistory",
            //可售套餐 修改 多语言
            prodPkgOfferLanguage: host + path + "/prodPkgOffer/lan/multilanguage",

            currentOrg: host + path + '/user/current',

            /**提交立项申请 */
            submitProject: host + path + "/project/submit",
            /**提交客户申请 */
            submitCustomer: host + path + "/customer/submit",
            /**深度开发类别 */
            deepdev: host + path + "/project/deepdevcategory",
            //管理方模糊查询下拉
            magmtSearch: host + path + "/managing/namemap?managingName=",
            //报价单项目列表
            quote: host + path + "/quote",
            //报价单失效
            quoteDisable: host + path + "/quote/{id}/disable",
            //客户附件上传地址
            customerAttachmentUploadUrl: host + path + "/files/upload",
            //客户附件下载地址
            customerAttachmentDownloadUrl: host + path + "/files/download",
            //报价单详情
            quoteDetail: host + path + "/quote/{quotId}",
            //项目下的报价单
            quoteOfProject: host + path + "/project/{projectid}/quote",
            // 查询项目下可以提交审批的报价单
            findUnapprovedQuotationUrl: host + path + "/project/findUnapprovedQuotationById/{projId}",
            // 查询项目下可以提交审批的合同
            findUnapprovedContractUrl: host + path + "/project/findUnapprovedContractById/{projId}",
            //项目失败
            getProjectFailUrl: host + path + "/commonproject/updateStatus",
            //项目领取
            getProjectClaimUrl: host + path + "/commonproject/updateStatus",
            //城市列表
            city: host + path + "/city",
            //雇员城市列表
            cityTree: host + path + "/city/tree",
            //报价单城市列表
            quotCity: host + path + "/city/city?cityName=",
            //产品颗粒颗粒詳情
            prodKernel: host + path + "/prodBase",
            //可售单项列表
            prodSingle: host + path + "/prodOffer/getProdOfferList",
            //可售套餐列表
            prodPackage: host + path + "/prodPkgOffer/getProdPkgOfferList",
            //可售产品套餐列表
            prodPackageList: host + path + "/prodPkgOffer",
            //提交产品套餐
            subProdPackage: host + path + "/prodPkgOffer/submit",
            //可售套餐启用，禁用状态alison
            prodPackageStatus: host + path + "/prodPkgOffer/{prodPkgOfferId}/status",
            //可售单项启用禁用
            prodOfferStatus: host + path + "/prodOffer/{prodOfferId}/status",
            //保存产品颗粒
            saveProdKernel: host + path + "/prodBase",
            //提交产品颗粒
            subProdKernel: host + path + "/prodBase/submit",
            //产品颗粒启用禁用
            prodKernelStatus: host + path + "/prodBase/",
            //产品业务大类
            prodCate: host + path + "/busiCate",
            //根据产品大类获取产品分类
            productCate: host + path + "/busiCate",
            //获取单个服务项目
            servItembyId: host + "/salesmgmt/services/rest/prodBase/servItemById",
            //获取服务选项类型
            servItemOptionType: host + path + "/prodBase/serviceOptionTypeById",
            //服务选项
            servOptionType: host + path + "/datadict/servoptiontype",
            //产品服务选项
            //servOptionType120 : host + path + "/datadict/120",
            //计价方式
            costType: host + path + "/datadict/costtype",
            //计算方式
            valuationType: host + path + "/datadict/valuationtype",
            //产品单项里价格，成本计算方式
            ratecalcmeth: host + path + "/datadict/ratecalcmeth",
            //获取业务大类和下面的产品分类
            busiCateAndClassList: host + path + "/busiCate/cateAndClassList",
            //获取套餐列表
            packageList: host + path + "/prodPkgOffer",
            //获取同一基础产品下的单项产品列表
            samebaseprodofferlist: host + path + "/prodOffer/samebaseprodofferlist",
            //获取产品列表
            prodList: host + path + "/prodOffer",
            //提交产品单项
            prodSingleSubmit: host + path + "/prodOffer/submit",
            //单项产品详情
            prodDetail: host + path + "/prodOffer/",
            getQuoteProductDetailUrl: host + path + "/quote/getquoteProduct/{quoteProdId}",
            //套餐产品详情
            packageDetail: host + path + "/prodPkgOffer/",
            //计价单位
            measureUnit: host + path + "/prodOffer/measureunit",
            //通过项目id获取客户的业务范畴列表
            busiEditableList: host + path + "/quote/allCustomerScopes/{projectId}",
            //产品仓库菜单列表
            prodProdMemuList: host + path + "/busiCate/cateAndClassList",
            //产品仓库单品列表
            prodOfferList: host + path + "/prodOffer/sale",
            //产品仓库套餐列表
            prodPkgOfferList: host + path + "/prodPkgOffer",
            //产品仓库套餐列表
            getReferPrice: host + path + "/prodPkgOffer/referprice",
            //提交报价单
            submitQuote: host + path + "/quote/submit",
            // 批量审批报价单
            submitQuoteBatch: [host, path, '/quote/submitBatch'].join(''),
            // ----↓↓规则仓库url↓↓--- //
            // 保存规则追加
            regulation: host + path + "/ruleRepository/addRuleRepository",
            //变更保存
            changgeRegulation: host + path + "/ruleRepository/variationRuleRepToSave",
            // 规则保存并生效
            copyRegulationEff: host + path + "/ruleRepository/copyRuleRepositoryToEffective",
            saveRegulationEff: host + path + "/ruleRepository/addRuleRepositoryToEffective",
            // 数据字典
            // 列表查询
            regulationList: host + path + "/ruleRepository/list",
            // 通过id取得整个规则数据
            getInfoByRuleRepositoryId: host + path + "/ruleRepository/getInfoByRuleRepositoryId/{ruleRepositoryId}",
            // 复制增加数据取得
            copyRuleRepository: host + path + "/ruleRepository/copyRuleRepository/{ruleRepositoryId}",
            // 规则生效one
            effectiveRuleRepository: host + path + "/ruleRepository/updateRuleRepToEffective/{ruleRepositoryId}",
            //规则生效two
            toEffectiveRuleStatusRepository: host + path + "/ruleRepository/variationSaveRuleToEffective/{ruleRepositoryId}",
            // 切换默认
            ruleRepositoryToDefalut: host + path + "/ruleRepository/updateRuleRepToDefalut/{ruleRepositoryId}",
            // 取得机构
            getServiceAgencysById: host + path + "/ruleRepository/getServiceAgencysList/{cityId}",
            // 取得规则版本履历
            getRuleRepositoryLogListById: host + path + "/ruleRepository/getRuleRepositoryLogList/{ruleRepositoryId}",
            // 变更生效
            variationRuleRepository: host + path + "/ruleRepository/variationRuleRepToEffective",
            // 复制追加的数据保存
            copyAddRegulation: host + path + "/ruleRepository/copyRuleRepositoryToAdd",
            // 获取规则仓库查看页面选项列表
            getCityAndRuleListUrl: host + path + "/ruleRepository/getCityAndRuleList",
            // 根据规则ID,细则ID,月份取得细则详情以及相关要求
            getRuleRepositoryDetailUrl: host + path + "/ruleRepository/getRuleRepositoryDetail",
            // 查询规则仓库变更历史记录
            getRuleRepositoryDetailLogUrl: host + path + "/ruleRepository/getRuleRepositoryDetailLog/{year}/{versionId}/{ruleRepositoryId}",
            // 校验是否存在相同的规则名称
            checkRuleRepositoryName: host + path + '/ruleRepository/checkRuleRepositoryName',
            // 默认状态的判断
            checkRuleRepositoryIsDefault: host + path + '/ruleRepository/checkRuleRepositoryIsDefault',
            // ---↑↑规则仓库url↑↑--- //

            // ----↓↓合同管理url↓↓--- //
            // 查看页面
            getContractInfo: host + path + "/contractInfo/getInfoFromProById/{id}",
            // 根据项目信息进入新建合同页面 报价单：当前管理方下审批通过、已生效的报价单
            goContractInfoAdd: host + path + "/contractInfo/getInfoByProjId/{projId}",
            // 新增合同 （保存）
            addNewContract: host + path + "/contractInfo/addContract",
            // 提交审批合同
            aprovalContract: host + path + "/contractInfo/addContractToApproval",
            // 批量审批合同
            aprovalContractBatch: [host, path, '/contractInfo/addContractToApprovalBatch'].join(''),
            // 根据选择的业务范畴过滤当前管理方下的客户
            getCustomerByBusiCate: host + path + "/contractInfo/getCustomerByBusiCate/{busiCate}/{projId}",
            // 合同生效
            effectiveContract: host + path + "/contractInfo/updateInfoToEffective/{id}",
            // 取得合同列表
            getContractListUrl: host + path + "/contractInfo/list",
            // 关联关系页面取得合同列表
            getContractInfoList: host + path + "/contractInfo/getProjectInfoByProjId/{projId}",
            // 业务合同 新增 参数：项目id
            getBizContractInfoByProjIdUrl: host + path + "/contractInfoBiz/getBaseInfoFromById/{projId}",
            // 业务合同 新增 参数：框架合同id
            getBizContractInfoByFrameIdUrl: host + path + "/contractInfoBiz/getInfoByContractId/{contractId}",
            // 业务合同 查看/编辑  参数：业务合同的id
            getBizContractInfoInfoByContIdUrl: host + path + "/contractInfoBiz/getInfoFromProById/{id}",
            // 业务合同 切换业务范畴(框架合同) 参数： 项目id,业务范畴,框架合同id
            getBizContractInfoAddUrl: host + path + "/contractInfoBiz/getContractAndCustomerList/{projId}/{busiCate}/{contractId}",
            // 业务合同 切换合同类型，查询合同模板 参数： 项目id,业务范畴
            getBizContractInfoTemplateUrl: host + path + "/contractInfoBiz/getContractTemplateRelation/{projId}/{busiCate}/{contractId}",
            // 业务合同 保存  参数：业务合同info
            doBizContractInfoSaveUrl: host + path + "/contractInfoBiz/addContract",
            // 业务合同 提交 审批  参数：业务合同info
            doBizContractInfoSubmitUrl: host + path + "/contractInfoBiz/addContractToApproval",
            // 业务合同 服务启动  参数：业务合同的id
            doBizContractServiceStartUrl: host + path + "/contractInfoBiz/updateInfoToStart/{id}",
            // 业务合同 合同生效  参数：业务合同的id
            doBizContractEffectUrl: host + path + "/contractInfoBiz/updateInfoToEffective/{id}",
            //合同打印1
            contractPrintingUrl: host + path + "/contractInfo/contractPrinting/{id}",
            //附件合同打印申请状态
            updateExtInfoToPrintStatusUrl: host + path + "/contractInfoOption/updateOptionInfoToPrintStatus/{id}",
            //附件合同已打印
            updateExtInfoToPrintStatusFinishUrl: host + path + "/contractInfoOption/updateOptionInfoToPrintStatusFinish/{id}",
            //业务合同打印申请状态
            updateBizInfoToPrintStatusUrl: host + path + "/contractInfoBiz/updateBizInfoToPrintStatus/{id}",
            // 业务合同已打印
            updateBizInfoToPrintStatusFinishUrl: host + path + "/contractInfoBiz/updateInfoToPrintStatusFinish/{id}",
            // 框架合同打印申请状态
            updateInfoToPrintStatusUrl: host + path + "/contractInfo/updateInfoToPrintStatus/{id}",
            //框架合同已打印
            updateInfoToPrintStatusFinishUrl: host + path + "/contractInfo/updateInfoToPrintStatusFinish/{id}",
            //合同打印申请
            saveApplyUrl: host + path + "/contractInfo/addContractPrint",
            //合同打印申请获取
            getApplyDetailUrl: host + path + "/contractInfo/findprintTypeListById/{id}",
            // 协议(合同附件) 项目上新增 参数：项目id
            getAttContractInfoByProjIdUrl: host + path + "/contractInfoOption/getInfoByProjId/{projId}",
            // 协议(合同附件) 框架合同上新增 参数：框架合同id
            getAttContractInfoByFreContIdUrl: host + path + "/contractInfoOption/getInfoByFrameId/{contractId}",
            // 协议(合同附件) 业务合同上新增 参数：业务合同id
            getAttContractInfoByBizContIdUrl: host + path + "/contractInfoOption/getInfoByBizId/{bizId}",
            // 协议(合同附件) 查看/编辑  参数：业务合同的id
            getAttContractInfoInfoByContIdUrl: host + path + "/contractInfoOption/getInfoById/{id}",
            // 协议(合同附件) 切换框架合同时查询客户  参数：框架合同的id
            getFrameContractCustomerUrl: host + path + "/contractInfoOption/getContractInfoListById/{contractId}",
            // 协议(合同附件) 保存  参数：业务合同info
            doAttContractInfoSaveUrl: host + path + "/contractInfoOption/addContract",
            // 协议(合同附件) 提交 审批  参数：业务合同info
            doAttContractInfoSubmitUrl: host + path + "/contractInfoOption/addContractToApproval",
            // 协议(合同附件) 服务启动  参数：业务合同的id
            doAttContractServiceStartUrl: host + path + "/contractInfoOption/updateInfoToStart/{id}",
            // 协议(合同附件) 合同生效  参数：业务合同的id
            doAttContractEffectUrl: host + path + "/contractInfoOption/updateInfoToEffective/{id}",
            //合同模板 保存
            saveContractTemplate: host + path + "/contractTemplate/saveContractTemplate",
            //合同模板 启用
            useContractTemplate: host + path + "/contractTemplate/useContractTemplate",
            //合同模板 查询
            getContractTemplateById: host + path + "/contractTemplate/getContractTemplateById/{id}",
            //合同模板 停用
            updateContractTemplateStatus: host + path + "/contractTemplate/updateContractTemplateStatus/{id}",
            //管理方模糊查询
            getManageByNameUrl: host + path + "/contractTemplate/getManagingListByName/{name}",
            //合同模板列表 查询
            getTemplateListUrl: host + path + "/contractTemplate/list",
            //公共项目列表
            getPublicProjUrl: host + path + "/commonproject/list",
            //合同下载
            downloadContractUrl: host + path + "/contractInfo/testWord",
            // 模板生成
            createContractTemplate: host + path + "/contractInfo/createStandardContract/{id}",
            // 根据选择的所属合同类型查询可选的所属合同列表
            findContractInfosByParamsUrl: host + path + "/contractInfoOption/findContractInfosByParams/{projId}/{contractCategory}",
            // ---↑↑合同管理url↑↑--- //
            // ----↓↓公共联系人url↓↓--- //
            //公共联系人列表 查询
            getPublicContactListUrl: host + path + "/publicLinkman/list",
            //公共联系人 查询
            getPublicContactByIdUrl: host + path + "/publicLinkman/getInfoByLinkmanId/{linkmanId}",
            //管理方公共聯係人查詢
            getAccountPublicContactByIdUrl: host + path + "/publicLinkman/ownerList",
            // ---↑↑公共联系人url↑↑--- //

            // ----↓↓负面清单↓↓--- //
            // 服务项目组模糊查询
            getServGroupListByName: host + path + "/negativeList/getServGroupListByName",
            // 通过项目组检索项目
            getServeProListByBaseProdId: host + path + "/negativeList/getServeProListByBaseProdId",
            //负面清单列表查询
            getNegativeListsUrl: host + path + "/negativeList/list",
            //负面清单详细查询
            getInfoByIdUrl: host + path + "/negativeList/getInfoFromProById/{id}",
            //负面清单新增
            addNegativeUrl: host + path + "/negativeList/addNegativeList",
            //负面清单 停用
            updateInfoToStopUrl: host + path + "/negativeList/updateInfoToStop/{id}",
            //负面清单 启用
            addNegativeListToApproval: host + path + "/negativeList/addNegativeListToApproval",
            // ---↑↑负面清单↑↑--- //

            prodConfigOption: host + path + "/custserv/servlist/confinfo/list/",
            //获取产品颗粒下的配置组
            prodConfigGroup: host + path + "/custserv/servlist/confgrpinfo/list/",
            /*    雇员    */
            //获取雇员组列表
            getEmployeeGroup: host + path + "/employee/group",
            employeeOptionBase: host + path + "/employee/option/all",
            //雇员沟通列表页
            LinkList: host + path + "/employee/communicate",
            //雇员模糊查询下拉列表
            employeeSearchList: host + path + "/employeeCapacity/info/list",
            //雇员详情
            employeeSearchDetail: host + path + "/employee/info",
            //新增雇员
            employeeAdd: host + path + "/employee/communicate",

            //获取雇员资料搜索
            employeeSearchDeil: host + path + "/employee/info/",
            //雇员沟通记录详情
            employeeDeil: host + path + "/employee/communicate/",

            //根据产品颗粒id和服务项目id获取服务配置项
            configoptionByKernelIdAndServeItemId: host + path + "/custserv/servlist/confinfo/servitem",
            //根据配置组id获取配置组信息
            configGroup: host + path + "/custserv/servlist/confgrpinfo/{confGrpId}",
            //报价单的服务清单
            serveList: host + path + "/custserv/servlist/viewtemplates/{quoteId}"

            // ----↓↓OC002 OC003 OC004↓↓--- //
            //雇员列表查询
            ,
            getEmployeeListUrl: host + path + "/employee/info/getEmployeeList"
            // 取得雇员量表数据
            ,
            getEmployeeCapacityDataUrl: host + path + "/employeeCapacity/info/{id}",
            getEmployeeInfoCapacityUrl: host + path + "/employeeCapacityFirm/info/{empId}"
            // 雇员新增 初始化数据
            ,
            getAddEmployeeInitDataUrl: host + path + "/employee/info/getEmployeeInfoByCustId/{custId}"
            // 根据已输入的新增雇员信息自动匹配产品组和雇员组
            ,
            getEmGroupAndProductUrl: host + path + "/employee/info/getGroupAndProductList",
            getEmpCommunicateEmailInfo: host + path + "/employee/info/getEmpCommunicateEmailInfo/{empId}",
            //根据现有的雇员信息自动匹配产品组和雇员组
            getGroupAndProductListUrl: host + path + "/employeeServList/getServList/{id}",
            //雇员编辑查看
            getEmployeeSerInfoUrl: host + path + "/employeeServList/getInfo/{id}",
            //雇员服务变更生效
            variationEmployeeServListUrl: host + path + "/employeeServList/variationEmployeeServList",
            //查看页面生效
            effectiveServListStatusUrl: host + path + "/employeeServList/effectiveServListStatus",
            //雇员服务生效
            effectiveEmployeeServListUrl: host + path + "/employeeServList/effectiveEmployeeServList",
            // 根据证件类型以及证件号取得雇员的部分身份信息
            getEmployeeInfoByIdCodeUrl: host + path + "/employee/info/findEmployeeInfoByIdCode/{idTypeCode}/{idNo}",
            //雇员新增生效
            effecitiveEmployeeInfoUrl: host + path + "/employee/info/effecitiveEmployeeInfo"
            // 雇员新增保存
            ,
            addEmployeeUrl: host + path + "/employee/info/saveEmployeeInfo",
            //雇员编辑保存
            updateEmployeeServListUrl: host + path + "/employeeServList/updateEmployeeServList"
            // 校验雇员工号是否唯一性
            ,
            checkEmployeeWorkNumberUrl: host + path + "/employee/info/checkEmployeeWorkNumber/{workNumber}/{custId}/{versionId}"
            // 根据城市id获得城市信息（id可以多个）
            ,
            getCityInfoByIdUrl: host + path + "/employee/info/getCityInfo/{cityIds}"
            // 变更履历
            ,
            employeeInfoCapacityLogList: host + path + "/employeeCapacity/info/getEmployeeInfoCapacityLogList/{value}/{versionId}/{version}",
            //雇员编辑保存
            saveEmployeeInfoCapacityUrl: host + path + "/employeeCapacity/info/saveEmployeeInfoCapacity"
            // 补充证件变更履历
            ,
            getEmployeeSupplementCertificateLogList: host + path + "/employeeCapacity/info/getEmployeeSupplementCertificateLogList/{versionId}/{id}"
            // 家庭成员变更履历
            ,
            getEmployeeFamilyMembersLogList: host + path + "/employeeCapacity/info/getEmployeeFamilyMembersLogList/{versionId}/{id}"
            // 教育经历变更履历
            ,
            getEmployeeEducationExperienceLogList: host + path + "/employeeCapacity/info/getEmployeeEducationExperienceLogList/{versionId}/{id}"
            // 企业量表履历接口
            ,
            getCorporateLogList: host + path + "/employeeCapacity/info/getCorporateLogList/{value}/{versionId}/{version}"
            // ---↑↑OC002 OC003 OC004↑↑--- //

            // ----↓↓获取国家列表↓↓--- //
            ,
            getCountryListUrl: host + path + "/country/countryInfoList?countryName="
            // ----↑↑获取国家列表↑↑--- //

            //根据产品颗粒获取负面清单
            ,
            negativeListByProdbase: host + path + "/negativeList/getNegativeListByBaseProdId?serviceItemIds={baseProdId}&cityIds={cityId}",
            //规则仓库城市默认配置
            ruleRepositoryOfCity: host + path + "/custserv/servlist/defaultrulerepo/{cityId}",
            //客户模板
            LegalEntityTemplateList: host + path + "/custtemplate/servlist/{custID}",
            //雇员模板
            employeeTemplateList: host + path + "/employee/template/versions/{id}",
            //雇员模板
            employeeTemplate: host + path + "/employee/template/prods/{id}",

            //根据城市获取机构列表
            agencylistofCity: host + path + "/custserv/servlist/agencylist/{cityId}",
            //获取规则列表
            rulelist: host + path + "/custserv/servlist/rulerepolist",
            //规则详情
            ruleDetail: host + path + "/custserv/servlist/ruledetails/{ruleRepoId}",
            //保存服务清单
            saveServeList: host + path + '/custserv/servlist/savetemplates/{status}',

            //Url2
            //获取客户沟通详情
            customerDetail: host + path + "/comm",
            //沟通主题
            getSubjects: host + path + "/comm/tag.json",
            //新增编辑客户沟通、
            addcmct: host + path + "/comm",
            //沟通对象搜索
            searchCustomer: host + path + "/managing",
            //参与人搜索
            searchUser: host + path + "/user",
            //客户沟通list
            cmctlist: host + path + "/comm",
            //客户沟通list按年份
            cmctlistByYear: host + path + "/comm",
            //客户沟通年份list
            getcmctYear: host + path + "/comm/year",
            //获取当前用户
            getCurrentUser: host + path + "/user/current",
            //获取规则仓库详情根据规则仓库id
            reguRepoDetail: host + path + "/custserv/servlist/ruledetails/{ruleRepoId}",
            //获取拥有规则仓库的所有城市
            cityHasRegu: host + path + "/ruleRepository/getRuleCityList",
            //获取报价单的所有客户
            clientUnderQuote: host + path + "/contractInfo/getCustomerByQuotId/{quotId}",
            //服务清单产品配置校验及获取接口
            serveListProdConfig: host + path + "/custserv/servlist/confgrpinfo/check/{baseProductId}/{serviceItemId}",
            //获取产品依赖关系
            //改变配置组的状态
            confGrpStatus: host + path + "/custserv/servlist/confgrpinfo/{confGrpId}/status",
            prodDependency: host + path + "/prodOffer/dependentProds"
            //客户模板五险一金数据
            ,
            getEmpFiveInsurance: [host, path, '/employee/template/rule/'].join('')
            //雇员模板五险一金变更数据
            ,
            getEmpFiveInsuranceDiff: [host, path, "/employee/template/rule/diffrent"].join(''),
            //获取规则仓库最新版本
            repoLatestVersion: host + path + "/custserv/servlist/newestrule/{ruleRepoId}",
            //公共项目
            publicProj: host + "/salesmgmt/services/rest/commonproject",
            //客户冻结/客户冻结延期/客户终止/变更管理方
            updateCustStatus: host + path + "/customer/updateCustStatus/{id}/{status}",
            //获取管理方变更记录
            updateManagingHistory: host + path + "/customer/updateManagingHistory?custId=",
            //服务清单里面获取从产品带过来的服务选项
            serveOptionFromProd: host + path + "/custserv/servlist/confinfo/servoption/{quoteId}/{prodId}/{prodType} ",
            //管理方合并
            manageMerge:host+path+"/managing/mergeNewManagIng",
            //获取客户下面的产品，冻结项目或者管理方需要
            prodUnderClient:host+path+"/customer/getFrozenCustProducts/{custId}",
            //获取客户下面的产品，中介项目或者管理方需要
            prodUnderClientEnd:host+path+"/customer/getStopCustProducts/{custId}",
            //提交冻结项目
            saveFrozenProd:host+path+"/customer/forzenCustomer",
            //客户终止
            customerEnd:host+path+"/customer/getStopCustProducts/{custId}",
            //客户终止
            saveCustomerEnd:host+path+"/customer/stopCustomer",
            //管理方冻结
            manageFrozen:host+path+"/managing/frozen",
            //管理方冻结启用信息查询
            manageUnFrozenInfo:host+path+"/managing/thawing/{managingId}",
            //管理方冻结启用提交
            manageUnFrozen:host+path+"/managing/thawing",
            //管理方终止
            manageEnd:host+path+"/managing/stop",
            //客户冻结延期
            customerFreezeDelay:host+path+"/customer/frozenDelayCustomer",
            //管理方终止启用
            manageUnEnd:host+path+"/managing/reuse",
            //请求客户管理方变更管理方列表
            changeCustomerManagerList:host+path+"/customer/managingList/",
            //客户管理方变更管理方
            changeCustomerManager:host+path+"/customer/updateManaging",
            //客户冻结重启时查询客户已冻结的产品
            getHadFrozenCustProducts:host+path+"/customer/getHadFrozenCustProducts/",
            //客户终止启用
            stopCustomerToStart:host+path+"/customer/stopCustomerToStart",
            //管理方终止，冻结等等的审批流
            manageApproveFlow:host+approvalpath+"/approvalFlow/findCommentsByObjectId",
            //客户冻结启用
            forzenRestartCustomer:host+path+"/customer/forzenRestartCustomer",
            //拆分管理方
            manageSplit:host+path+"/managing/splitNewManagIng",
            //产品组合
            checkProdDepOrMut:host+path+"/prodPkgOffer/checkProdDepOrMut",
            // 报价单打印
            quotationPrintingUrl: host + path + "/quote/quotationPrinting/{isSplit}/{id}",
            //新计价单位
            pricemeasureUnit: host + path + "/prodOffer/pricemeasureunit",
            //获取管理方下的咨询顾问
            consultants:host+path+"/managing/{id}/allconsultants",
            //价格的服务选项
            priceServOption:host+path+"/custserv/servlist/confinfo/price/{quoteId}/{prodId}/{prodType}",
            //配置项
            confServOption:host+path+"/custserv/servlist/confinfo/confoption/{quoteId}/{prodId}/{prodType}",
            //系统时间
            time:host+path+"/date",
            //客户变更管理方 获取管理方下可操作的客户
            changableCust:host+path+"/customer/managedCustomerList/{managingId}",
            //删除规则仓库
            regulationToStop: host + path + "/ruleRepository/regulationToStop/{ruleRepositoryId}"
        };

    }]).factory("serviceLoading", ["$rootScope", function ($rootScope) {
        $rootScope.serviceLoadingCount = $rootScope.serviceLoadingCount || 0;
        return {
            showLoading: function () {
                $rootScope.serviceLoadingCount++;
                str = "<div class='serviceLoadingBg'></div>" +
                    "<div class='serviceLoading'>" +
                    '<div class="spinner"><div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div>' +
                    "<p>Loading...</p>" +
                    "</div>";
                if ($("body").find(".serviceLoadingBg").length < 1 && $("body").find(".serviceLoading").length < 1) {
                    $("body").append(str);
                }
            },
            hideLoading: function () {
                $rootScope.serviceLoadingCount--;
                if ($rootScope.serviceLoadingCount <= 0) {
                    $("body").find(".serviceLoadingBg").remove();
                    $("body").find(".serviceLoading").remove();
                }
            }
        }
    }])
    .factory("wraploading", ["serviceLoading", function (serviceLoading) {
        return {
            wrap: function (obj, excludedMethodNames) {
                return _.object(_.keys(obj).filter(key => _.isFunction(obj[key])),
                    _.map(_.keys(obj).filter(key => _.isFunction(obj[key])),
                    key =>
                _.wrap(obj[key], function (fn) {
                    //鎵撳紑寮瑰嚭灞
                    if ((!excludedMethodNames) || (!_.contains(excludedMethodNames, key))) serviceLoading.showLoading();
                    return fn.apply(obj, _.toArray(arguments).slice(1));
                })
                ))
                ;
            }
        }
    }]);
