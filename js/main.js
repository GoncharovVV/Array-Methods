window.onload = function() {
    (function(){
        var buttonOk = document.getElementById( 'ok' ),
            buttonCancel = document.getElementById( 'cancel' ),
            bodyNode = document.querySelector( 'body' );
        buttonCancel.addEventListener( 'click', function() {
            bodyNode.classList.remove( 'popap-opened' );
            initPage();
        });
        buttonOk.addEventListener( 'click', function() {
            var jsonTextarea = document.getElementById( 'json-data' ),
                jsonText = jsonTextarea.value,
                errorField = document.querySelector( '.error' );
            if ( errorField ) {
                errorField.remove();
            }
            try {
                users = JSON.parse( jsonText );
                if ( typeof users === 'object' ) {
                    bodyNode.classList.remove( 'popap-opened' );
                    initPage( users );    
                }
                else {
                    errorField = document.createElement('span');
                    errorField.classList.add('error');
                    errorField.innerHTML = 'Invalid value';
                    jsonTextarea.parentNode.insertBefore( errorField, jsonTextarea.nextElementSibling );
                }
            } catch (e) {
                errorField = document.createElement('span');
                errorField.classList.add('error');
                errorField.innerHTML = 'Invalid value';
                jsonTextarea.parentNode.insertBefore( errorField, jsonTextarea.nextElementSibling );
            }
        });
    }());
    function initPage( innerData ) {
        function ArrayMethods() {
            this.navItemsArray = [
                {'tabNavigation':'сoncat',
                 'elements':[
                     {'label':'json'},
                     {'textarea':'true',
                     'id': 'json_area'},
                 ]},
                // {'tabNavigation':'join',
                // 'elements':[
                //     {'label':'delimiter'},
                //     {'input':'text',
                //     'id':'join_input'},
                // ]},
                {'tabNavigation':'push',
                'elements':[
                    {'label':'Name'},
                    {'input':'text',
                    'id':'name'},
                    {'label':'Age'},
                    {'input':'text',
                    'id':'age'},
                ]},
                {'tabNavigation':'find',
                'elements':[
                    {'label':'Age'},
                    {'input':'text',
                    'id':'age'},
                ]},
                {'tabNavigation':'pop'},
                // {'tabNavigation':'shift'},
                // {'tabNavigation':'unshift',
                // 'elements':[
                //     {'label':'Name'},
                //     {'input':'text',
                //     'id':'name'},
                //     {'label':'Age'},
                //     {'input':'text',
                //     'id':'age'},
                // ]},
                // {'tabNavigation':'slice',
                // 'elements':[
                //     {'label':'Start Index'},
                //     {'input':'number',
                //     'id':'start_index'},
                //     {'label':'Up to Index'},
                //     {'input':'number',
                //     'id':'up_to_index'},
                // ]},
                {'tabNavigation':'splice',
                'elements':[
                    {'label':'Index'},
                    {'input':'number',
                    'id':'index'},
                    {'label':'Count to Remove'},
                    {'input':'number',
                    'id':'count_to_remove'},
                    {'label':'Name'},
                    {'input':'text',
                    'id':'name'},
                    {'label':'Age'},
                    {'input':'text',
                    'id':'age'},
                ]},
                // {'tabNavigation':'reverse'},
                {'tabNavigation':'sort',
                'elements':[
                    {'label':'"Name" or "Age"'},
                    {'input':'text',
                    'id':'variable'},
                ]},
                {'tabNavigation':'indexOf',
                'elements':[
                    {'label':'Name'},
                    {'input':'text',
                    'id':'name'},
                ]},
                {'tabNavigation':'lastIndexOf',
                'elements':[
                    {'label':'Age'},
                    {'input':'text',
                    'id':'age'},
                ]},
                // {'tabNavigation':'forEach'},
                {'tabNavigation':'map',
                'elements':[
                    {'label':'Age increase on'},
                    {'input':'text',
                    'id':'increase'},
                ]},
                {'tabNavigation':'filter',
                'elements':[
                    {'label':'Name'},
                    {'input':'text',
                    'id':'name'},
                ]},
                // {'tabNavigation':'every',
                // 'elements':[
                //     {'label':'Number'},
                //     {'input':'text',
                //     'id':'every'},
                // ]},
                // {'tabNavigation':'some',
                // 'elements':[
                //     {'label':'Value to check Name'},
                //     {'input':'text',
                //     'id':'name'},
                // ]},
                {'tabNavigation':'reduce',
                'elements':[
                    {'label':'Put part of name to see average age'},
                    {'input':'text',
                    'id':'name'},
                ]}
            ];
        }
        ArrayMethods.prototype['indexOf'] = function( objectHolder, valueName, value ) {
            var i = 0;
            for (; i < objectHolder.length; i++) {
                if( ~(objectHolder[i][valueName].indexOf(value))) {
                    return i;
                }
            }
        }
        ArrayMethods.prototype['concat'] = function( inputJson ) {
            return this.workWithData.concat(inputJson);
        }
        ArrayMethods.prototype['push'] = function( nameVal, ageVal ) {
            if (this.resultData.length === 0) {
                this.resultData = this.resultData.concat(this.workWithData);
            }
            this.resultData.push( {'name': nameVal, 'age': ageVal} );
            return this.resultData;
        }
        ArrayMethods.prototype['pop'] = function() {
            if (this.resultData.length === 0 ) {
                this.resultData = this.resultData.concat(this.workWithData);
            }
            this.resultData.pop();
            return this.resultData;
        }
        ArrayMethods.prototype['map'] = function( callback, arrayValues ) {
            var sortArray = arrayValues || this.workWithData;
            return sortArray.map(callback);
        }
        ArrayMethods.prototype['filter'] = function( filterValue ) {
            return this.workWithData.filter(function(row) {
                return ~(row.name.toLowerCase().indexOf(filterValue.toLowerCase()));
            });
        }
        ArrayMethods.prototype['find'] = function( ageVal ) {
            var result = this.workWithData.find(function(row) {
                if (row.age === ageVal) {
                    return row;
                }
            })
                resultArr = []; 
            if ( typeof result !== 'undefined' ) {
                resultArr.push(result);
            }
            return resultArr;
        }
        ArrayMethods.prototype['sort'] = function( callback ) {
            if (callback) {
                this.workWithData.sort(callback);
            }
            else {
                this.workWithData.sort(callback);
            }
            return this.workWithData;
        }
        ArrayMethods.prototype['reduce'] = function( arrayValues, callback ) {
            return (arrayValues.reduce(callback,0))/arrayValues.length;
        }
        ArrayMethods.prototype['splice'] = function( start, deleteCount, item ) {
            var arrayCopy = this.workWithData;
            if ( item ) {
                arrayCopy.splice(start, deleteCount, item);
            }
            else {
                arrayCopy.splice(start, deleteCount);
            }
            return arrayCopy;
        }
        ArrayMethods.prototype.initNavigation = function() {
            var navigation = document.createElement( 'ul' ),
                parentElement = document.querySelector( '.navigation__holder' ),
                navItem = '';
                navigation.classList.add( 'navigation' );
            for ( var i = 0; i < this.navItemsArray.length; i++ ) {
                
                navItem = document.createElement( 'li' );
                navItem.classList.add( 'navigation__item' );
                if (i === 0) {
                    navItem.classList.add( 'active' );
                    this.initTab(i);
                    this.callMethods();
                }
                navItem.setAttribute( 'data-tab', this.navItemsArray[i]['tabNavigation'] );
                navItem.innerHTML = this.navItemsArray[i]['tabNavigation'];
                navigation.appendChild( navItem );
            }
            parentElement.appendChild( navigation );
        }
        ArrayMethods.prototype.initTab = function( index ) {
            var elementsObject = this.navItemsArray[index].elements,
                parentNode = document.getElementById( 'actionForm' ),
                buttonHolder = document.createElement( 'div' );
                buttonHolder.classList.add('button-holder');
                nodeElement = '';
            if ( elementsObject ) {
                for( var i = 0; i < elementsObject.length; i++) {
                    if( elementsObject[i]['textarea'] ) {
                        nodeElement = document.createElement( 'textarea' );
                        nodeElement.setAttribute( 'id', elementsObject[i]['id'] );
                    }
                    else if ( elementsObject[i]['label'] ) {
                        nodeElement = document.createElement( 'label' );
                        nodeElement.innerHTML = elementsObject[i]['label'];
                    }
                    else {
                        nodeElement = document.createElement( 'input' );
                        nodeElement.setAttribute( 'type', elementsObject[i]['input'] );
                        nodeElement.setAttribute( 'id', elementsObject[i]['id'] );
                    }
                    parentNode.appendChild( nodeElement );
                }
            }
            nodeElement = document.createElement( 'button' );
            nodeElement.innerHTML = 'Execute';
            nodeElement.setAttribute( 'type', 'submit' );
            nodeElement.setAttribute( 'data-action', this.navItemsArray[index][ 'tabNavigation' ] );
            buttonHolder.appendChild( nodeElement );
            parentNode.appendChild( buttonHolder );
        }
        ArrayMethods.prototype.initTabAction = function() {
            var buttonHolder = document.querySelector( '.navigation' ),
            objectMethods = this;
            if ( buttonHolder ) {
                buttonHolder.addEventListener( 'click', function( e ) {
                    e.preventDefault;
                    e.stopPropagation;
                    var that = this;
                    if ( e.target !== that ) {
                        objectMethods.resultData = [].concat(objectMethods.workWithData);
                        var targetAttribute = e.target.getAttribute( 'data-tab' ),
                            currentTab = document.querySelector( '.navigation .active' ),
                            methodIndex = objectMethods['indexOf']( objectMethods.navItemsArray, 'tabNavigation', targetAttribute ),
                            parentNode = document.getElementById( 'actionForm' );
                        objectMethods.clearResult();
                        while (parentNode.firstChild) {
                            parentNode.removeChild(parentNode.firstChild);
                        }
                        currentTab.classList.remove( 'active' );
                        e.target.classList.add( 'active' );
                        objectMethods.initTab( methodIndex );
                        objectMethods.callMethods();
                    }
                });
            }
        }
        ArrayMethods.prototype.initErrorNode = function() {
            var errorField = document.createElement('span');
            errorField.classList.add('error');
            return errorField;
        }
        ArrayMethods.prototype.clearResult = function() {
            var resultHolder = document.getElementById( 'resultArrayContainer' );
            if ( resultHolder.childNodes.length > 0 ) {
                while (resultHolder.firstChild) {
                    resultHolder.removeChild(resultHolder.firstChild);
                }
            }
        }
        ArrayMethods.prototype.clearErrors = function() {
            var errorsHolder = document.getElementById( 'actionForm' );
                errors = errorsHolder.querySelectorAll( '.error' );
            if ( errors.length > 0 ) {
                for( var i = 0; i < errors.length; i++ ) {
                    errors[i].remove();
                }
            }
        }
        ArrayMethods.prototype.callMethods = function() {
            var button = document.querySelector( '[data-action]' ),
                that = this;
            button.addEventListener( 'click', function( e ) {
                e.preventDefault;
                e.stopPropagation;
                var method = this.getAttribute( 'data-action' ),
                    appendResultTo = document.getElementById( 'resultArrayContainer' );
                if ( method === 'indexOf' ) {
                    that.clearErrors();
                    var inputNode = document.getElementById( 'name' ),
                        regExpression = /^[a-zA-Z\s]*$/;
                    if ( !regExpression.test(inputNode.value) || inputNode.value.length === 0 ) {
                        var errorNode = that.initErrorNode();
                        errorNode.innerHTML = 'Invalid value';
                        inputNode.parentNode.insertBefore( errorNode, inputNode.nextElementSibling );
                    }
                    else {
                        that.clearResult();
                        var resultArray = that['map']( function( item ) {
                            return item.name.toLowerCase().indexOf(inputNode.value.toLowerCase());});
                        that.printSimpleData( resultArray );
                    }
                }
                else if ( method === 'map' ) {
                    var inputNode = document.getElementById( 'increase' ),
                        resultArray = '';
                    if ( parseInt(inputNode.value) && inputNode.value.length < 3 ) {
                        that.clearResult();
                        that.clearErrors();
                        resultArray = that['map']( function( item ) {
                            return item.age + parseInt( inputNode.value );});
                        var tableHead = that.tableHeadNode( 'age' ),
                            tableBody = that.tableBodyNode( resultArray , true),
                            tableNode = document.createElement( 'div' );
                        tableNode.classList.add( 'table' );
                        tableNode.appendChild( tableHead );
                        tableNode.appendChild( tableBody );
                        appendResultTo.appendChild( tableNode );
                    }
                    else {
                        var errorNode = that.initErrorNode();
                        errorNode.innerHTML = 'Invalid value';
                        inputNode.parentNode.insertBefore( errorNode, inputNode.nextElementSibling );
                    }
                }
                else if ( method === 'сoncat' ) {
                    that.clearResult();
                    that.clearErrors();
                    var textArea = document.getElementById( 'json_area' ),
                        textAreaValue = textArea.value,
                        parseResult = that.valueParse( textAreaValue );
                    if ( typeof parseResult != 'object' || !parseResult ) {
                        var errorNode = that.initErrorNode();
                        errorNode.innerHTML = 'Invalid value';
                        textArea.parentNode.insertBefore( errorNode, textArea.nextElementSibling );
                    }
                    else {
                        that.printTable( 'resultArrayContainer', that['concat']( parseResult ) );
                    }
                }
                else if ( method === 'push' ) {
                    var inputNameNode = document.getElementById( 'name' ),
                        inputAgeNode = document.getElementById( 'age' ),
                        regExpression = /^[a-zA-Z\s]*$/,
                        validName, validAge = '';
                    that.clearErrors();
                    if ( !regExpression.test(inputNameNode.value) || inputNameNode.value.length === 0 ) {
                        var errorNode = that.initErrorNode();
                        errorNode.innerHTML = 'Invalid value';
                        inputNameNode.parentNode.insertBefore( errorNode, inputNameNode.nextElementSibling );
                    }
                    else {
                        validName = inputNameNode.value;
                    }
                    if ( !parseInt(inputAgeNode.value) || inputAgeNode.value.length > 3 || inputAgeNode.value.length === 0 ) {
                        var errorNode = that.initErrorNode();
                        errorNode.innerHTML = 'Invalid value';
                        inputAgeNode.parentNode.insertBefore( errorNode, inputAgeNode.nextElementSibling );
                    }
                    else {
                        validAge = parseInt(inputAgeNode.value);
                    }
                    if ( validAge && validName) {
                        that.clearResult();
                        that.printTable('resultArrayContainer', that['push']( validName, validAge ) );
                    }
                }
                else if ( method === 'pop' ) {
                    that.clearResult();
                    that.printTable('resultArrayContainer', that['pop']() );
                }
                else if ( method === 'filter' ) {
                    var inputNameNode = document.getElementById( 'name' ),
                        regExpression = /^[a-zA-Z\s]*$/;
                    that.clearErrors();
                    if ( !regExpression.test(inputNameNode.value) || inputNameNode.value.length === 0 ) {
                        var errorNode = that.initErrorNode();
                        errorNode.innerHTML = 'Invalid value';
                        inputNameNode.parentNode.insertBefore( errorNode, inputNameNode.nextElementSibling );
                    }
                    else {
                        that.clearResult();
                        that.printTable('resultArrayContainer', that['filter']( inputNameNode.value ) );
                    }
                }
                else if ( method === 'find' ) {
                    var inputAgeNode = document.getElementById( 'age' );
                    that.clearErrors();
                    if ( !parseInt(inputAgeNode.value) || inputAgeNode.value.length > 3 || inputAgeNode.value.length === 0 ) {
                        var errorNode = that.initErrorNode();
                        errorNode.innerHTML = 'Invalid value';
                        inputAgeNode.parentNode.insertBefore( errorNode, inputAgeNode.nextElementSibling );
                    }
                    else {
                        that.clearResult();
                        console.log(that['find']( parseInt(inputAgeNode.value)));
                        that.printTable('resultArrayContainer', that['find']( parseInt(inputAgeNode.value) ) );
                    }
                }
                else if ( method === 'sort' ) {
                    var inputNode = document.getElementById( 'variable' );
                    that.clearErrors();
                    if ( inputNode.value.toLowerCase() === 'age' ) {
                        that.clearResult();
                        that.printTable('resultArrayContainer', that['sort']( function(a,b){
                            return a.age - b.age;
                        } ));
                    }
                    else if ( inputNode.value.toLowerCase() === 'name' ) {
                        that.clearResult();
                        that.printTable('resultArrayContainer', that['sort']( function(a,b){
                            return a.name > b.name;
                        } ));
                    }
                    else {
                        var errorNode = that.initErrorNode();
                        errorNode.innerHTML = 'Invalid value';
                        inputNode.parentNode.insertBefore( errorNode, inputNode.nextElementSibling );
                    }
                }
                else if ( method === 'reduce' ) {
                    that.clearErrors();
                    var inputNode = document.getElementById( 'name' ),
                        regExpression = /^[a-zA-Z\s]*$/;
                    if ( !regExpression.test(inputNode.value) || inputNode.value.length === 0 ) {
                        var errorNode = that.initErrorNode();
                        errorNode.innerHTML = 'Invalid value';
                        inputNode.parentNode.insertBefore( errorNode, inputNode.nextElementSibling );
                    }
                    else {
                        that.clearResult();
                        var averageAge = that['reduce']( that['filter']( inputNode.value ), function( a, b ){ return a + b.age;} );
                        if ( Number.isNaN(averageAge) ) {
                            that.printSimpleData( ['There is no matches'] );
                        }
                        else {
                            that.printSimpleData( ['Average age', averageAge] );
                        }
                    }
                }
                else if ( method === 'splice' ) {
                    var inputNameNode = document.getElementById( 'name' ),
                        inputAgeNode = document.getElementById( 'age' ),
                        start = document.getElementById( 'index').value || 0,
                        deleteCount = document.getElementById( 'count_to_remove').value || 0,
                        regExpression = /^[a-zA-Z\s]*$/,
                        validName, validAge = '';
                    console.log(deleteCount,start);
                    that.clearErrors();
                    if ( !regExpression.test(inputNameNode.value)) {
                        var errorNode = that.initErrorNode();
                        errorNode.innerHTML = 'Invalid value';
                        inputNameNode.parentNode.insertBefore( errorNode, inputNameNode.nextElementSibling );
                    }
                    else {
                        validName = inputNameNode.value;
                    }
                    if (inputAgeNode.value) {
                        if ( !parseInt(inputAgeNode.value) || inputAgeNode.value.length > 3 ) {
                            var errorNode = that.initErrorNode();
                            errorNode.innerHTML = 'Invalid value';
                            inputAgeNode.parentNode.insertBefore( errorNode, inputAgeNode.nextElementSibling );
                        }
                        else {
                            validAge = parseInt(inputAgeNode.value);
                        }
                    }
                    if ( validAge && validName) {
                        that.clearResult();
                        that.printTable('resultArrayContainer', that['splice']( start, deleteCount , {"name": validName, "age": validAge} ) );
                    }
                    else {
                        that.clearResult();
                        that.printTable('resultArrayContainer', that['splice']( start, deleteCount ) );
                    }
                }
                else if ( method === 'lastIndexOf' ) {
                    
                }
            });
        }
        function Users( innerData ) {
            ArrayMethods.call(this);
            this.defaultData = [
                {
                    'name': 'Snow',
                    'age': 34
                },
                {
                    'name': 'Rachel',
                    'age': 44
                },
                {
                    'name': 'Tan',
                    'age': 24
                },
                {
                    'name': 'Shay',
                    'age': 20
                },
                {
                    'name': 'Reluca',
                    'age': 25
                },
                {
                    'name': 'Crimm',
                    'age': 34
                }
            ];
            this.workWithData = innerData || this.defaultData;
            this.resultData = [];
        }
        Users.prototype = Object.create( ArrayMethods.prototype );
        Users.prototype.printSimpleData = function( dataAray ) {
            var parentNode = document.getElementById( "resultArrayContainer" ),
                childsHolder = document.createElement( 'div' ),
                childNode;
            for( var i=0; i < dataAray.length; i++) {
                childNode = document.createElement( 'div' );
                childNode.innerHTML = dataAray[i];
                childNode.classList.add( 'simple-text' );
                childsHolder.appendChild( childNode );
            }
            parentNode.appendChild( childsHolder );
        }
        Users.prototype.tableHeadNode = function( columnName ) {
            var headNode = document.createElement( 'div' ),
                nameNode = document.createElement( 'div' ),
                ageNode = document.createElement( 'div' );
            headNode.classList.add('table__header');
            nameNode.classList.add('table__header-item','column');
            nameNode.innerHTML = 'Name';
            ageNode.classList.add('table__header-item','column');
            ageNode.innerHTML = 'Age';
            if (columnName === 'name' || !columnName) {
                headNode.appendChild( nameNode );
            }
            if (columnName === 'age' || !columnName) {
                headNode.appendChild( ageNode );
            }
            
            return headNode;
        }
        Users.prototype.tableBodyNode = function( value, single ) {
            var itemName, itemAge = '',
                contentNode = document.createElement( 'div' );
                contentNode.classList.add('table__body');
            for( var i = 0; i < value.length; i++) {
                itemName = document.createElement( 'div' );
                itemName.classList.add( 'column', 'table__body-item' );
                if ( !single ) {
                    if (value[i]['name']) {
                        itemName.innerHTML = value[i]['name'];
                        contentNode.appendChild(itemName);
                    }
                    itemAge = document.createElement( 'div' );
                    itemAge.classList.add( 'column', 'table__body-item' );
                    if (value[i]['age']) {
                        itemAge.innerHTML = value[i]['age'];
                        contentNode.appendChild(itemAge);
                    }
                }
                else {
                    itemName.innerHTML = value[i];
                    contentNode.appendChild(itemName);
                }
            }
            return contentNode;
        }
        Users.prototype.valueParse = function( value ) {
            var users = '';
            try {
                users = JSON.parse( value );
            } catch (e) {
                // console.log( 'Value is not JSON' );
                // console.log( e.name );
                // console.log( e.message );
                return false;
            }
            return users;
        }
        Users.prototype.printTable = function( targetId, data ) {
                var dataJSON = data || this.workWithData,
                    initialNode =  document.getElementById( targetId ),
                    headNode = this.tableHeadNode(),
                    bodyNode = this.tableBodyNode(dataJSON),
                    tableNode = document.createElement( 'div' );
                tableNode.classList.add( 'table' );
                tableNode.appendChild( headNode );
                tableNode.appendChild( bodyNode );
                initialNode.appendChild( tableNode );
        }
        var somebody = new Users( innerData );
        somebody.printTable( 'initialArrayConatiner' );
        somebody.initNavigation();
        somebody.initTabAction();
    }
}
