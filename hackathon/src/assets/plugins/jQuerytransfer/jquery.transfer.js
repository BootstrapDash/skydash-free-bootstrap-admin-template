/**
 * 穿梭框
 */
var Transfer = (function ($) {
    // 全局变量，已选择项个数
    var selected_total_num = 0;
    // 当前时间，作为 id 使用
    var currentTimeStr = (new Date()).getTime() + parseInt(10000 * Math.random());
    // input 的 id
    var inputId = "";

    /**
     * 构造穿梭框
     * @param settings 设置项
     */
    function transfer(settings) {

        inputId = settings.inputId;
        // 数据项的名称
        var itemName = settings.itemName;
        // 分组的名称
        var groupItemName = settings.groupItemName;
        // 分组的列表名称
        var groupListName = settings.groupListName;
        // 值的名称
        var valueName = settings.valueName;
        // 容器
        var container = "." + settings.container;
        // 数据变化的回调函数
        var callable = settings.callable;
        // 穿梭框
        var transferId = "#transfer_double_" + inputId;

        // 接收选中项文本框
        var selectInputId = "#" + inputId;

        // 列表数据
        var data = settings.data || [];
        // 分组列表数据
        var groupData = settings.groupData || [];

        // 数据项总个数
        var total_num = settings.data.length;
        // 总个数显示文本
        var total_num_str = settings.data.length + " Items";

        // 分组总个数
        var total_group_num = getGroupNum(groupData, groupListName);
        // 分组总个数显示文本
        var total_group_num_str = total_group_num + " Items";

        // 新的总个数
        var new_total_num = 0;
        // 新的分组总个数
        var new_group_total_num = 0;

        // 标签页
        var tabItemName = ".tab-item-name-" + currentTimeStr;
        // 标签页内容
        var transferDoubleList = ".transfer-double-list-" + currentTimeStr;

        // 左侧搜索框 id
        var listSearchId = "#listSearch_" + currentTimeStr;
        // 左侧分组搜索框 id
        var groupListSearchId = "#groupListSearch_" + currentTimeStr;
        // 右侧搜索框 id
        var selectedListSearchId = "#selectedListSearch_" + currentTimeStr;

        // 左侧未选中项内容
        var tabContentFirst = ".tab-content-first-" + currentTimeStr;
        // 左侧未选中项列表 ul
        var transferDoubleListUl = ".transfer-double-list-ul-" + currentTimeStr;
        // 左侧未选中项列表 li
        var transferDoubleListLi = ".transfer-double-list-li-" + currentTimeStr;
        // 左侧列表项 checkbox
        var checkboxItem = ".checkbox-item-" + currentTimeStr;
        // 左侧列表项名称
        var checkboxName = ".checkbox-name-" + currentTimeStr;
        // 左侧总个数显示元素
        var totalNum = ".total_num_" + currentTimeStr;
        // 左侧未选中项列表全选 id
        var selectAllId = "#selectAll_" + currentTimeStr;

        // 左侧分组列表 ul
        var transferDoubleGroupListUl = ".transfer-double-group-list-ul-" + currentTimeStr;
        // 左侧分组列表 li
        var transferDoubleGroupListLi = ".transfer-double-group-list-li-" + currentTimeStr;
        // 左侧分组列表分组全选，是分组全选，不是全选
        var groupSelectAll = ".group-select-all-" + currentTimeStr;
        // 左侧分组列表分组名称
        var groupName = ".group-name-" + currentTimeStr;
        // 左侧不同分组 ul
        var transferDoubleGroupListLiUl = ".transfer-double-group-list-li-ul-" + currentTimeStr;
        // 左侧不同分组 li
        var transferDoubleGroupListLiUlLi = ".transfer-double-group-list-li-ul-li-" + currentTimeStr;
        // 左侧不同分组 checkbox
        var groupCheckboxItem = ".group-checkbox-item-" + currentTimeStr;
        // 左侧不同分组选项名称
        var groupCheckboxName = ".group-checkbox-name-" + currentTimeStr;
        // 左侧分组总个数显示元素
        var groupTotalNum = ".group_total_num_" + currentTimeStr;
        // 左侧未选中分组列表全选 id
        var groupsSelectAllId = "#groupsSelectAll_" + currentTimeStr;

        // 右侧列表 ul
        var transferDoubleSelectedListUl = ".transfer-double-selected-list-ul-" + currentTimeStr;
        // 右侧列表 li
        var transferDoubleSelectedListLi = ".transfer-double-selected-list-li-" + currentTimeStr;
        // 右侧列表选中项
        var checkboxSelectedItem = ".checkbox-selected-item-" + currentTimeStr;
        // 右侧列表选中项名称
        var checkboxSelectedName = ".checkbox-selected-name-" + currentTimeStr;
        // 右侧全选 id，留待后续使用
        var selectedAllId = "#selectedAll_" + currentTimeStr;
        // 右侧总个数显示元素
        var selectedTotalNum = ".selected_total_num_" + currentTimeStr;

        // 往右添加按钮
        var addSelected = "#add_selected_" + currentTimeStr;
        // 往左添加按钮
        var deleteSelected = "#delete_selected_" + currentTimeStr;


        // 穿梭框渲染
        $(container).append(generateTransfer(inputId, currentTimeStr));

        /**
         * 数据渲染
         */
        $(transferId).find(transferDoubleListUl).empty();
        $(transferId).find(transferDoubleListUl).append(generateLeftList(currentTimeStr, data, itemName, valueName));
        $(transferId).find(totalNum).empty();
        $(transferId).find(totalNum).append(total_num_str);

        $(transferId).find(transferDoubleGroupListUl).empty();
        $(transferId).find(transferDoubleGroupListUl).append(generateLeftGroupList(currentTimeStr, groupData, itemName, groupListName, groupItemName, valueName));
        $(transferId).find(groupTotalNum).empty();
        $(transferId).find(groupTotalNum).append(total_group_num_str);

        /**
         * 点击标签页切换
         */
        $(transferId).find(tabItemName).on("click", function () {
            $(selectAllId).prop("checked", false);
            if (!$(this).is(".tab-active")) {
                $(this).addClass("tab-active").siblings().removeClass("tab-active");
                $(transferDoubleList).eq($(transferId).find(tabItemName).index(this)).addClass("tab-content-active").siblings().removeClass("tab-content-active");
                $(transferId).find(".checkbox-normal").each(function () {
                    $(this).prop("checked", false);
                });
                $(addSelected).removeClass("btn-arrow-active");
                $(transferId).find(transferDoubleSelectedListUl).empty();
                // 清空右侧数量
                $(transferId).find(selectedTotalNum).text("0 Items");
                // 未选中项
                if ($(transferId).find(tabContentFirst).css("display") != "none") {
                    $(transferId).find(transferDoubleGroupListLiUlLi).each(function () {
                        $(this).css('display', 'block');
                    });
                    $(transferId).find(groupCheckboxItem).each(function () {
                        $(this).prop("checked", false);
                    });

                    $(transferId).find(selectAllId).prop("disabled", "");

                    $(transferId).find(groupTotalNum).empty();
                    $(transferId).find(groupTotalNum).append($(transferId).find(transferDoubleGroupListLiUlLi).length + " Items");
                } else {
                    // 分组

                    // 清空 disabled
                    for (var j = 0; j < $(transferId).find(groupSelectAll).length; j++) {
                        $(transferId).find(groupSelectAll).eq(j).prop("disabled", "");
                    }
                    $(transferId).find(groupsSelectAllId).prop("disabled", "");

                    $(transferId).find(transferDoubleListLi).each(function () {
                        $(this).css('display', 'block');
                    });
                    $(transferId).find(checkboxItem).each(function () {
                        $(this).prop("checked", false);
                    });
                    $(transferId).find(totalNum).empty();
                    $(transferId).find(totalNum).append($(transferId).find(transferDoubleListLi).length + " Items");
                }
                // 数据变化触发回调
                callable.call(this, getSelected(), getSelectedName());
                // 标签切换按钮修改为未激活
                $(addSelected).removeClass("btn-arrow-active");
                $(deleteSelected).removeClass("btn-arrow-active");
            }
        });

        /**
         * 监听左侧未选中项 checkBox 是否被选中
         */
        $(transferId).on("click", checkboxItem, function () {
            var selected_num = 0;
            for (var i = 0; i < $(transferId).find(checkboxItem).length; i++) {
                if ($(transferId).find(transferDoubleListLi).eq(i).css('display') != "none" && $(transferId).find(checkboxItem).eq(i).is(':checked')) {
                    selected_num++;
                }
            }
            if (selected_num > 0) {
                $(addSelected).addClass("btn-arrow-active");
            } else {
                $(addSelected).removeClass("btn-arrow-active");
            }
        });

        /**
         * 监听左侧分组 checkBox 是否被选中
         */
        $(transferId).on("click", groupCheckboxItem, function () {
            var selected_num = 0;
            for (var i = 0; i < $(transferId).find(groupCheckboxItem).length; i++) {
                if ($(transferId).find(transferDoubleGroupListLiUlLi).eq(i).css('display') != "none" && $(transferId).find(groupCheckboxItem).eq(i).is(':checked')) {
                    selected_num++;
                }
            }
            if (selected_num > 0) {
                $(addSelected).addClass("btn-arrow-active");
            } else {
                $(addSelected).removeClass("btn-arrow-active");
            }
        });

        // 监听右侧未选中项 checkBox 是否被选中
        $(transferId).on("click", checkboxSelectedItem, function () {
            var deleted_num = 0;
            for (var i = 0; i < $(transferId).find(checkboxSelectedItem).length; i++) {
                if ($(transferId).find(checkboxSelectedItem).eq(i).is(':checked')) {
                    deleted_num++;
                }
            }
            if (deleted_num > 0) {
                $(deleteSelected).addClass("btn-arrow-active");
            } else {
                $(deleteSelected).removeClass("btn-arrow-active");
            }
        });

        // 选中或者反选分组中的所有未选中项
        $(groupSelectAll).on("click", function () {
            // 分组索引
            var groupIndex = ($(this).attr("id")).split("_")[1];
            // 某个分组被选中
            if ($(this).is(':checked')) {
                // 激活按钮
                $(addSelected).addClass("btn-arrow-active");
                for (var i = 0; i < $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).length; i++) {
                    if (!$(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).is(':checked') && $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).parent().parent().css("display") != "none") {
                        // 此处如果用 attr，会出现第三次失效的情况
                        $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).prop("checked", true);
                    }
                }
                var groupCheckedNum = 0;
                $(transferId).find(groupSelectAll).each(function () {
                    if ($(this).is(":checked")) {
                        groupCheckedNum = groupCheckedNum + 1;
                    }
                });
                if (groupCheckedNum == $(transferId).find(groupSelectAll).length) {
                    $(groupsSelectAllId).prop("checked", true);
                }
            } else {
                for (var j = 0; j < $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).length; j++) {
                    if ($(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(j).is(':checked') && $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).parent().parent().css("display") != "none") {
                        $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(j).prop("checked", false);
                    }
                }
                var groupCheckedNum = 0;
                $(transferId).find(groupSelectAll).each(function () {
                    if ($(this).is(":checked")) {
                        groupCheckedNum = groupCheckedNum + 1;
                    }
                });
                if (groupCheckedNum != $(transferId).find(groupSelectAll).length) {
                    $(groupsSelectAllId).prop("checked", false);
                }
                if (groupCheckedNum == 0) {
                    $(addSelected).removeClass("btn-arrow-active");
                }
            }
        });

        /**
         * 列表全选
         */
        $(selectAllId).on("click", function () {
            if ($(this).is(':checked')) {
                for (var i = 0; i < $(transferId).find(checkboxItem).length; i++) {
                    if ($(transferId).find(transferDoubleListLi).eq(i).css('display') != "none" && !$(transferId).find(checkboxItem).eq(i).is(':checked')) {
                        //此处如果用attr，会出现第三次失效的情况
                        $(transferId).find(checkboxItem).eq(i).prop("checked", true);
                    }
                }
                $(addSelected).addClass("btn-arrow-active");
            } else {
                for (var i = 0; i < $(transferId).find(checkboxItem).length; i++) {
                    if ($(transferId).find(transferDoubleListLi).eq(i).css('display') != "none" && $(transferId).find(checkboxItem).eq(i).is(':checked')) {
                        $(transferId).find(checkboxItem).eq(i).prop("checked", false);
                    }
                }
                $(addSelected).removeClass("btn-arrow-active");
            }
        });

        /**
         * 分组全选
         */
        $(groupsSelectAllId).on("click", function () {
            if ($(this).is(':checked')) {
                for (var i = 0; i < $(transferId).find(groupCheckboxItem).length; i++) {
                    if ($(transferId).find(transferDoubleGroupListLiUlLi).eq(i).css('display') != "none" && !$(transferId).find(groupCheckboxItem).eq(i).is(':checked')) {
                        // 此处如果用 attr，会出现第三次失效的情况
                        $(transferId).find(groupCheckboxItem).eq(i).prop("checked", true);
                    }
                    if (!$(transferId).find(groupSelectAll).eq(i).is(':checked')) {
                        $(transferId).find(groupSelectAll).eq(i).prop("checked", true);
                    }
                }
                $(addSelected).addClass("btn-arrow-active");
            } else {
                for (var i = 0; i < $(transferId).find(groupCheckboxItem).length; i++) {
                    if ($(transferId).find(transferDoubleGroupListLiUlLi).eq(i).css('display') != "none" && $(transferId).find(groupCheckboxItem).eq(i).is(':checked')) {
                        $(transferId).find(groupCheckboxItem).eq(i).prop("checked", false);
                    }
                    if ($(transferId).find(groupSelectAll).eq(i).is(':checked')) {
                        $(transferId).find(groupSelectAll).eq(i).prop("checked", false);
                    }
                }
                $(addSelected).removeClass("btn-arrow-active");
            }
        });

        /**
         * 将选中项添加至右侧
         */
        $(addSelected).on("click", function () {
            var listHtmlStr = "";
            var selectedItemNum = 0;
            // 分组
            if ($(transferId).find(tabContentFirst).css("display") != "none") {
                for (var i = 0; i < $(transferId).find(groupCheckboxItem).length; i++) {
                    if ($(transferId).find(groupCheckboxItem).eq(i).is(':checked')) {
                        var checkboxItemId = $(transferId).find(groupCheckboxItem).eq(i).attr("id");
                        var checkboxItemArray = checkboxItemId.split("_");
                        var groupIdIndex = checkboxItemArray[1];
                        var idIndex = checkboxItemArray[3];
                        var val = $(transferId).find(groupCheckboxName).eq(i).text();
                        var value = $(transferId).find(groupCheckboxItem).eq(i).val();
                        $(transferId).find(transferDoubleGroupListLiUlLi).eq(i).css('display', 'none');
                        listHtmlStr = listHtmlStr + '<li class="transfer-double-selected-list-li transfer-double-selected-list-li-' + currentTimeStr + ' .clearfix">' +
                            '<div class="checkbox-group">' +
                            '<input type="checkbox" value="' + value + '" class="checkbox-normal checkbox-selected-item-' + currentTimeStr + '" id="group_' + groupIdIndex + '_selectedCheckbox_' + idIndex + '_' + currentTimeStr + '">' +
                            '<label class="checkbox-selected-name-' + currentTimeStr + '" for="group_' + groupIdIndex + '_selectedCheckbox_' + idIndex + '_' + currentTimeStr + '">' + val + '</label>' +
                            '</div>' +
                            '</li>'
                        selectedItemNum = selectedItemNum + 1;
                    }
                }
                for (var j = 0; j < $(transferId).find(groupSelectAll).length; j++) {
                    if ($(transferId).find(groupSelectAll).eq(j).is(":checked")) {
                        $(transferId).find(groupSelectAll).eq(j).prop("disabled", "disabled");
                    }
                }
                $(transferId).find(groupTotalNum).empty();
                // 计算左侧总数
                new_group_total_num = total_group_num - selectedItemNum;
                // 计算右侧总数
                selected_total_num = selectedItemNum;
                var new_total_num_str = new_group_total_num + " Items";
                // 左侧数量
                $(transferId).find(groupTotalNum).append(new_total_num_str);
                // 右侧数量
                $(transferId).find(selectedTotalNum).text(selected_total_num + " Items");
                if (new_group_total_num == 0) {
                    $(groupsSelectAllId).prop("checked", true);
                    $(groupsSelectAllId).prop("disabled", "disabled");
                }
            } else {
                // 未选中项
                for (var i = 0; i < $(transferId).find(checkboxItem).length; i++) {
                    if ($(transferId).find(checkboxItem).eq(i).is(':checked')) {
                        var checkboxItemId = $(transferId).find(checkboxItem).eq(i).attr("id");
                        var idIndex = checkboxItemId.split("_")[1];
                        var val = $(transferId).find(checkboxName).eq(i).text();
                        var value = $(transferId).find(checkboxItem).eq(i).val();
                        $(transferId).find(transferDoubleListLi).eq(i).css('display', 'none');
                        listHtmlStr = listHtmlStr + '<li class="transfer-double-selected-list-li  transfer-double-selected-list-li-' + currentTimeStr + ' .clearfix">' +
                            '<div class="checkbox-group">' +
                            '<input type="checkbox" value="' + value + '" class="checkbox-normal checkbox-selected-item-' + currentTimeStr + '" id="selectedCheckbox_' + idIndex + '_' + currentTimeStr + '">' +
                            '<label class="checkbox-selected-name-' + currentTimeStr + '" for="selectedCheckbox_' + idIndex + '_' + currentTimeStr + '">' + val + '</label>' +
                            '</div>' +
                            '</li>';
                        selectedItemNum = selectedItemNum + 1;
                    }
                }
                $(transferId).find(totalNum).empty();
                // 计算新的左侧总数
                new_total_num = total_num - selectedItemNum;
                // 计算右侧总数
                selected_total_num = selectedItemNum;
                var new_total_num_str = new_total_num + " Items";
                // 左侧数量
                $(transferId).find(totalNum).append(new_total_num_str);
                // 右侧数量
                $(transferId).find(selectedTotalNum).text(selected_total_num + " Items");
                if (new_total_num == 0) {
                    $(selectAllId).prop("checked", true);
                    $(selectAllId).prop("disabled", "disabled");
                }
            }
            $(addSelected).removeClass("btn-arrow-active");
            $(transferId).find(transferDoubleSelectedListUl).empty();
            $(transferId).find(transferDoubleSelectedListUl).append(listHtmlStr);
            // 数据变化触发回调
            callable.call(this, getSelected(), getSelectedName());
        });

        /**
         * 删除选中项，回到左侧
         */
        $(deleteSelected).on("click", function () {
            var deleteItemNum = 0;
            // 分组
            if ($(transferId).find(tabContentFirst).css("display") != "none") {
                for (var i = 0; i < $(transferId).find(checkboxSelectedItem).length;) {
                    if ($(transferId).find(checkboxSelectedItem).eq(i).is(':checked')) {
                        var checkboxSelectedItemId = $(transferId).find(checkboxSelectedItem).eq(i).attr("id");
                        var groupItemIdArray = checkboxSelectedItemId.split("_")
                        var groupId = groupItemIdArray[1];
                        var idIndex = groupItemIdArray[3];
                        $(transferId).find(transferDoubleSelectedListLi).eq(i).remove();
                        $(transferId).find("#group_" + groupId + "_" + currentTimeStr).prop("checked", false);
                        $(transferId).find("#group_" + groupId + "_" + currentTimeStr).removeAttr("disabled");
                        $(transferId).find("#group_" + groupId + "_checkbox_" + idIndex + "_" + currentTimeStr).prop("checked", false);
                        $(transferId).find("#group_" + groupId + "_checkbox_" + idIndex + "_" + currentTimeStr).parent().parent().css('display', 'block');
                        deleteItemNum = deleteItemNum + 1;
                    } else {
                        i++;
                    }
                }
                $(transferId).find(groupTotalNum).empty();
                // 计算左侧总数
                new_group_total_num = new_group_total_num + deleteItemNum;
                // 计算右侧总数
                selected_total_num -= deleteItemNum;
                var new_total_num_str = new_group_total_num + " Items";
                // 左侧总数
                $(transferId).find(groupTotalNum).append(new_total_num_str);
                // 右侧总数
                $(transferId).find(selectedTotalNum).text(selected_total_num + " Items");
                if ($(groupsSelectAllId).is(':checked')) {
                    $(groupsSelectAllId).prop("checked", false);
                    $(groupsSelectAllId).removeAttr("disabled");
                }
            } else {
                // 未选中项
                for (var i = 0; i < $(transferId).find(checkboxSelectedItem).length;) {
                    if ($(transferId).find(checkboxSelectedItem).eq(i).is(':checked')) {
                        var checkboxSelectedItemId = $(transferId).find(checkboxSelectedItem).eq(i).attr("id");
                        var idIndex = checkboxSelectedItemId.split("_")[1];
                        var val = $(transferId).find(checkboxSelectedName).eq(i).text();
                        $(transferId).find(transferDoubleSelectedListLi).eq(i).remove();
                        $(transferId).find(checkboxItem).eq(idIndex).prop("checked", false);
                        $(transferId).find(transferDoubleListLi).eq(idIndex).css('display', 'block');
                        deleteItemNum = deleteItemNum + 1;
                    } else {
                        i++;
                    }
                }
                $(transferId).find(totalNum).empty();
                // 计算左侧总数
                new_total_num = new_total_num + deleteItemNum;
                // 计算右侧总数
                selected_total_num -= deleteItemNum;
                var new_total_num_str = new_total_num + " Items";
                // 左侧总数
                $(transferId).find(totalNum).append(new_total_num_str);
                // 右侧总数
                $(transferId).find(selectedTotalNum).text(selected_total_num + " Items");
                if ($(selectAllId).is(':checked')) {
                    $(selectAllId).prop("checked", false);
                    $(selectAllId).removeAttr("disabled");
                }
            }
            $(deleteSelected).removeClass("btn-arrow-active");
            // 数据变化触发回调
            callable.call(this, getSelected(), getSelectedName());
        });

        /**
         * 左侧模糊查询
         */
        $(listSearchId).on("keyup", function () {
            // 只要输入就显示列表框
            $(transferId).find(transferDoubleListUl).css('display', 'block');
            // 如果什么都没填，保持全部显示状态
            if ($(listSearchId).val() == "") {
                for (var i = 0; i < $(transferId).find(checkboxItem).length; i++) {
                    if (!$(transferId).find(checkboxItem).eq(i).is(':checked')) {
                        $(transferId).find(transferDoubleListLi).eq(i).css('display', 'block');
                    }
                }
                return;
            }

            // 如果填了，先将所有的选项隐藏
            $(transferId).find(transferDoubleListLi).css('display', 'none');

            for (var j = 0; j < $(transferId).find(transferDoubleListLi).length; j++) {
                // 模糊匹配，将所有匹配项显示
                if (!$(transferId).find(checkboxItem).eq(j).is(':checked')
                    && $(transferId).find(transferDoubleListLi).eq(j).text()
                        .substr(0, $(listSearchId).val().length).toLowerCase() == $(listSearchId).val().toLowerCase()) {
                    $(transferId).find(transferDoubleListLi).eq(j).css('display', 'block');
                }
            }
        });

        /**
         * 左侧分组模糊查询
         */
        $(groupListSearchId).on("keyup", function () {
            // 只要输入就显示列表框
            $(transferId).find(transferDoubleGroupListUl).css('display', 'block');
            // 如果什么都没填，保持全部显示状态
            if ($(groupListSearchId).val() == "") {
                for (var i = 0; i < $(transferId).find(groupCheckboxItem).length; i++) {
                    if (!$(transferId).find(checkboxItem).eq(i).is(':checked')) {
                        // 分组 li 改为显示
                        $(transferId).find(transferDoubleGroupListLiUlLi).eq(i).parent().parent().css('display', 'block');
                        // 分组下每个 li 改为显示
                        $(transferId).find(transferDoubleGroupListLiUlLi).eq(i).css('display', 'block');
                    }
                }
                return;
            }

            // 如果填了，先将所有的选项隐藏
            $(transferId).find(transferDoubleGroupListLi).css('display', 'none');
            $(transferId).find(transferDoubleGroupListLiUlLi).css('display', 'none');

            for (var j = 0; j < $(transferId).find(transferDoubleGroupListLiUlLi).length; j++) {
                // 模糊匹配，将所有匹配项显示
                if (!$(transferId).find(groupCheckboxItem).eq(j).is(':checked')
                    && $(transferId).find(transferDoubleGroupListLiUlLi).eq(j).text()
                        .substr(0, $(groupListSearchId).val().length).toLowerCase() == $(groupListSearchId).val().toLowerCase()) {
                    // 分组 li 改为显示
                    $(transferId).find(transferDoubleGroupListLiUlLi).eq(j).parent().parent().css('display', 'block');
                    $(transferId).find(transferDoubleGroupListLiUlLi).eq(j).css('display', 'block');
                }
            }
        });

        /**
         * 右侧模糊查询
         */
        $(selectedListSearchId).keyup(function () {
            // 只要输入就显示列表框
            $(transferId).find(transferDoubleSelectedListUl).css('display', 'block');

            // 如果什么都没填,保持全部显示状态
            if ($(selectedListSearchId).val() == "") {
                $(transferId).find(transferDoubleSelectedListLi).css('display', 'block');
                return;
            }
            $(transferId).find(transferDoubleSelectedListLi).css('display', 'none');

            for (var i = 0; i < $(transferId).find(transferDoubleSelectedListLi).length; i++) {
                // 模糊匹配，将所有匹配项显示
                if ($(transferId).find(transferDoubleSelectedListLi).eq(i).text()
                        .substr(0, $(selectedListSearchId).val().length).toLowerCase() == $(selectedListSearchId).val().toLowerCase()) {
                    $(transferId).find(transferDoubleSelectedListLi).eq(i).css('display', 'block');
                }
            }
        });
    }

    /**
     * 左侧列表渲染
     * @param currentTimeStr
     * @param data
     * @returns {string}
     */
    function generateLeftList(currentTimeStr, data, itemName, valueName) {
        var listHtmlStr = "";
        for (var i = 0; i < data.length; i++) {
            listHtmlStr = listHtmlStr +
                '<li class="transfer-double-list-li transfer-double-list-li-' + currentTimeStr + '">' +
                '<div class="checkbox-group">' +
                '<input type="checkbox" value="' + data[i][valueName] + '" class="checkbox-normal checkbox-item-' + currentTimeStr + '" id="itemCheckbox_' + i + '_' + currentTimeStr + '">' +
                '<label class="checkbox-name-' + currentTimeStr + '" for="itemCheckbox_' + i + '_' + currentTimeStr + '">' + data[i][itemName] + '</label>' +
                '</div>' +
                '</li>'
        }
        return listHtmlStr;
    }

    /**
     * 左侧分组列表渲染
     * @param currentTimeStr
     * @param data
     * @returns {string}
     */
    function generateLeftGroupList(currentTimeStr, data, itemName, groupListName, groupItemName, valueName) {
        var listHtmlStr = "";
        for (var i = 0; i < data.length; i++) {
            listHtmlStr = listHtmlStr +
                '<li class="transfer-double-group-list-li transfer-double-group-list-li-' + currentTimeStr + '">'
                + '<div class="checkbox-group">' +
                '<input type="checkbox" class="checkbox-normal group-select-all-' + currentTimeStr + '" id="group_' + i + '_' + currentTimeStr + '">' +
                '<label for="group_' + i + '_' + currentTimeStr + '" class="group-name-' + currentTimeStr + '">' + data[i][groupItemName] + '</label>' +
                '</div>';
            if (data[i][groupListName].length > 0) {
                listHtmlStr = listHtmlStr + '<ul class="transfer-double-group-list-li-ul transfer-double-group-list-li-ul-' + currentTimeStr + '">'
                for (var j = 0; j < data[i][groupListName].length; j++) {
                    listHtmlStr = listHtmlStr + '<li class="transfer-double-group-list-li-ul-li transfer-double-group-list-li-ul-li-' + currentTimeStr + '">' +
                        '<div class="checkbox-group">' +
                        '<input type="checkbox" value="' + data[i][groupListName][j][valueName] + '" class="checkbox-normal group-checkbox-item-' + currentTimeStr + ' belongs-group-' + i + '-' + currentTimeStr + '" id="group_' + i + '_checkbox_' + j + '_' + currentTimeStr + '">' +
                        '<label for="group_' + i + '_checkbox_' + j + '_' + currentTimeStr + '" class="group-checkbox-name-' + currentTimeStr + '">' + data[i][groupListName][j][itemName] + '</label>' +
                        '</div>' +
                        '</li>';
                }
                listHtmlStr = listHtmlStr + '</ul>'
            } else {
                listHtmlStr = listHtmlStr + '</li>';
            }
            listHtmlStr = listHtmlStr + '</li>';
        }
        return listHtmlStr;
    }

    /**
     * 获取分组中项个数
     * @param data
     * @returns {number}
     */
    function getGroupNum(data, groupListName) {
        var total_group_num = 0;
        for (var i = 0; i < data.length; i++) {
            var groupData = data[i][groupListName];
            if (groupData.length > 0) {
                total_group_num = total_group_num + groupData.length;
            }
        }
        return total_group_num;
    }


    /**
     * 返回选中的项目 value 数组
     * @returns {Array}
     */
    function getSelected() {
        // 穿梭框
        var transferId = "#transfer_double_" + inputId;
        var selected = [];
        var transferDoubleSelectedListLi = ".transfer-double-selected-list-li-" + currentTimeStr;

        for (var i = 0; i < $(transferId).find(transferDoubleSelectedListLi).length; i++) {
            // 模糊匹配，将所有匹配项显示
            var value = $(transferId).find(transferDoubleSelectedListLi).eq(i).find(".checkbox-group").find("input").val();
            selected.push(value);
        }
        return selected;
    }

    /**
     * 返回选中的项目名称数组
     * @returns {Array}
     */
    function getSelectedName() {
        // 穿梭框
        var transferId = "#transfer_double_" + inputId;
        var selected = [];
        var transferDoubleSelectedListLi = ".transfer-double-selected-list-li-" + currentTimeStr;

        for (var i = 0; i < $(transferId).find(transferDoubleSelectedListLi).length; i++) {
            // 模糊匹配，将所有匹配项显示
            var value = $(transferId).find(transferDoubleSelectedListLi).eq(i).find(".checkbox-group").find("label").text();
            selected.push(value);
        }
        return selected;
    }

    /**
     * 渲染穿梭框
     * @param inputId
     * @param currentTimeStr
     * @returns {string}
     */
    function generateTransfer(inputId, currentTimeStr) {
        var htmlStr =
            '<div class="transfer-double" id="transfer_double_' + inputId + '">'
            + '<div class="transfer-double-header"></div>'
            + '<div class="transfer-double-content clearfix">'
            + '<div class="transfer-double-content-left">'
            + '<div class="transfer-double-content-tabs">'
            + '<div class="tab-item-name tab-item-name-' + currentTimeStr + ' tab-active">Groups</div>'
            + '<div class="tab-item-name tab-item-name-' + currentTimeStr + '">Items</div>'
            + '</div>'

            + '<div class="transfer-double-list transfer-double-list-' + currentTimeStr + ' tab-content-first-' + currentTimeStr + ' tab-content-active">'
            + '<div class="transfer-double-list-header">'
            + '<div class="transfer-double-list-search">'
            + '<input class="transfer-double-list-search-input" type="text" id="groupListSearch_' + currentTimeStr + '" placeholder="Search" value="" />'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-list-content">'
            + '<div class="transfer-double-list-main">'
            + '<ul class="transfer-double-group-list-ul transfer-double-group-list-ul-' + currentTimeStr + '">'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-list-footer">'
            + '<div class="checkbox-group">'
            + '<input type="checkbox" class="checkbox-normal" id="groupsSelectAll_' + currentTimeStr + '"><label for="groupsSelectAll_' + currentTimeStr + '" class="group_total_num_' + currentTimeStr + '"></label>'
            + '</div>'
            + '</div>'
            + '</div>'

            + '<div class="transfer-double-list transfer-double-list-' + currentTimeStr + '">'
            + '<div class="transfer-double-list-header">'
            + '<div class="transfer-double-list-search">'
            + '<input class="transfer-double-list-search-input" type="text" id="listSearch_' + currentTimeStr + '" placeholder="Search" value="" />'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-list-content">'
            + '<div class="transfer-double-list-main">'
            + '<ul class="transfer-double-list-ul transfer-double-list-ul-' + currentTimeStr + '">'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-list-footer">'
            + '<div class="checkbox-group">'
            + '<input type="checkbox" class="checkbox-normal" id="selectAll_' + currentTimeStr + '"><label for="selectAll_' + currentTimeStr + '" class="total_num_' + currentTimeStr + '"></label>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'

            + '<div class="transfer-double-content-middle">'
            + '<div class="btn-select-arrow" id="add_selected_' + currentTimeStr + '"><i class="iconfont icon-forward"></i></div>'
            + '<div class="btn-select-arrow" id="delete_selected_' + currentTimeStr + '"><i class="iconfont icon-back"></i></div>'
            + '</div>'
            + '<div class="transfer-double-content-right">'
            + '<div class="transfer-double-content-param">'
            + '<div class="param-item">Selected</div>'
            + '</div>'
            + '<div class="transfer-double-selected-list">'
            + '<div class="transfer-double-selected-list-header">'
            + '<div class="transfer-double-selected-list-search">'
            + '<input class="transfer-double-selected-list-search-input" type="text" id="selectedListSearch_' + currentTimeStr + '" placeholder="Search" value="" />'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-selected-list-content">'
            + '<div class="transfer-double-selected-list-main">'
            + '<ul class="transfer-double-selected-list-ul transfer-double-selected-list-ul-' + currentTimeStr + '">'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-list-footer">'
            + '<label class="selected_total_num_' + currentTimeStr + '">0 Item</label>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-footer">'
            + '</div>'
            + '</div>';
        return htmlStr;
    }

    return {
        transfer: transfer
    }
})($);
