const contentData = {
    'prompt1-a1': `You are an expert in 3GPP specifications, particularly in NAS procedures. I want you to help me extract the procedure flow from the following text from 3GPP TS 24.501. Focus on:

1. States (e.g., 5GMM-DEREGISTERED)
2. Actions (e.g., REGISTRATION REQUEST)
3. Events (e.g., UE initiates registration)
4. Parameters (e.g., 5G-GUTI)
5. Conditionals (e.g., "if no 5G-GUTI available")
6. Metadata (section numbers, procedure names)

Format the output as a JSON object with these components clearly identified.`,

    'prompt2-a1': `Given the text from 3GPP TS 24.501 section 5.5.1.2.2, analyze and extract the initial registration procedure flow. Focus on:
1. Message sequence
2. State transitions
3. Conditional paths
4. Parameters involved`,

    'json1-a1': {
        "procedureName": "Initial registration procedure",
        "nodes": [
            {
                "id": "5GMM-DEREGISTERED",
                "type": "State",
                "entity": "UE",
                "properties": {
                    "state": "5GMM-DEREGISTERED",
                    "description": "UE is in 5GMM-DEREGISTERED state and starts initial registration procedure."
                },
                "metadata": {
                    "document_id": "3GPP TS 24.501",
                    "section_reference": "5.1.3.2.1.2.2"
                }
            },
            {
                "id": "Registration Request (Initial Registration)",
                "type": "Event",
                "entity": "UE",
                "properties": {
                    "eventType": "Send",
                    "description": "UE sends Registration Request for initial registration."
                },
                "metadata": {
                    "document_id": "3GPP TS 24.501",
                    "section_reference": "5.5.1.2.2"
                }
            },
            {
                "id": "5GMM-REGISTERED-INITIATED",
                "type": "State",
                "entity": "UE",
                "properties": {
                    "state": "5GMM-REGISTERED-INITIATED",
                    "description": "UE enters 5GMM-REGISTERED-INITIATED state after sending Registration Request."
                },
                "metadata": {
                    "document_id": "3GPP TS 24.501",
                    "section_reference": "5.1.3.2.1.2.3"
                }
            },
            {
                "id": "Registration Accept",
                "type": "Event",
                "entity": "AMF",
                "properties": {
                    "eventType": "Receive",
                    "description": "AMF sends Registration Accept message."
                },
                "metadata": {
                    "document_id": "3GPP TS 24.501",
                    "section_reference": "5.5.1.2.4"
                }
            },
            {
                "id": "5GMM-REGISTERED",
                "type": "State",
                "entity": "UE",
                "properties": {
                    "state": "5GMM-REGISTERED",
                    "description": "UE enters 5GMM-REGISTERED state after successful registration."
                },
                "metadata": {
                    "document_id": "3GPP TS 24.501",
                    "section_reference": "5.1.3.2.1.2.4"
                }
            }
        ],
        "edges": [
            {
                "id": "Edge1",
                "from": "5GMM-DEREGISTERED",
                "to": "Registration Request (Initial Registration)",
                "type": "Transition",
                "properties": {
                    "messageType": "Registration Request",
                    "description": "UE initiates initial registration procedure."
                }
            },
            {
                "id": "Edge2",
                "from": "Registration Request (Initial Registration)",
                "to": "5GMM-REGISTERED-INITIATED",
                "type": "Action",
                "properties": {
                    "description": "UE waits for response from network."
                }
            },
            {
                "id": "Edge3",
                "from": "5GMM-REGISTERED-INITIATED",
                "to": "Registration Accept",
                "type": "Transition",
                "properties": {
                    "messageType": "Registration Accept",
                    "description": "AMF accepts registration request."
                }
            },
            {
                "id": "Edge4",
                "from": "Registration Accept",
                "to": "5GMM-REGISTERED",
                "type": "Action",
                "properties": {
                    "description": "UE stores registration information."
                }
            }
        ]
    },

    'json2-a1': {
        "procedureName": "Periodic Registration Update",
        "nodes": [
            {
                "id": "UE_5GMM_IDLE",
                "type": "State",
                "entity": "UE",
                "properties": {
                    "state": "5GMM-IDLE",
                    "description": "UE is in 5GMM-IDLE mode over 3GPP access."
                },
                "metadata": {
                    "document_id": "3GPP TS 24.501",
                    "section_reference": "5.3.7"
                }
            },
            {
                "id": "T3512_Expiry",
                "type": "Event",
                "entity": "UE",
                "properties": {
                    "eventType": "Timer Expiry",
                    "description": "Periodic registration update timer T3512 expires."
                },
                "metadata": {
                    "document_id": "3GPP TS 24.501",
                    "section_reference": "5.3.7"
                }
            },
            {
                "id": "UE_Registered",
                "type": "State",
                "entity": "UE",
                "properties": {
                    "state": "5GMM-REGISTERED",
                    "description": "UE is in 5GMM-REGISTERED state."
                },
                "metadata": {
                    "document_id": "3GPP TS 24.501",
                    "section_reference": "5.5.1.3.2"
                }
            },
            {
                "id": "Registration_Request_Sent",
                "type": "Event",
                "entity": "UE",
                "properties": {
                    "eventType": "Message Sent",
                    "description": "UE sends a REGISTRATION REQUEST message to the AMF."
                },
                "metadata": {
                    "document_id": "3GPP TS 24.501",
                    "section_reference": "5.5.1.3.2"
                }
            }
        ],
        "edges": [
            {
                "id": "Periodic_Registration_Procedure",
                "from": "T3512_Expiry",
                "to": "Registration_Request_Sent",
                "type": "Action",
                "properties": {
                    "description": "UE performs the periodic registration procedure if T3512 expires in 5GMM-IDLE mode and the UE is not registered for emergency services."
                }
            },
            {
                "id": "T3512_Expiry_to_UE_Registered",
                "from": "UE_5GMM_IDLE",
                "to": "T3512_Expiry",
                "type": "Transition",
                "properties": {
                    "description": "Transition from 5GMM-IDLE to T3512 expiry event."
                }
            },
            {
                "id": "UE_Registered_to_Registration_Request_Sent",
                "from": "UE_Registered",
                "to": "Registration_Request_Sent",
                "type": "Transition",
                "properties": {
                    "description": "Transition from 5GMM-REGISTERED to Registration Request Sent."
                }
            }
        ]
    },

    // Add content for approach 2 similarly
    'prompt1-a2': `Your prompt 2 content here...`,
    'prompt2-a2': `Your prompt 2 content here...`,
    'json1-a2': {
        "nodes": [
          {
            "id": "trigger_1",
            "label": "Network-initiated deregistration requiring re-registration",
            "type": "trigger",
            "properties": {
              "trigger_type": "Network initiated",
              "conditions": "Network requests UE to re-register",
              "related_states": "Any",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "trigger_2",
            "label": "UE configured for high priority access",
            "type": "trigger",
            "properties": {
              "trigger_type": "UE initiated",
              "conditions": "UE is configured for high priority access in selected PLMN or SNPN",
              "related_states": "Any",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "trigger_3",
            "label": "Registration for emergency services",
            "type": "trigger",
            "properties": {
              "trigger_type": "UE initiated",
              "conditions": "UE needs to register for emergency services",
              "related_states": "Any",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "trigger_4",
            "label": "Exception data reporting in NBN1 mode",
            "type": "trigger",
            "properties": {
              "trigger_type": "UE initiated",
              "conditions": "UE in NBN1 mode requested to transmit user data related to an exceptional event",
              "related_states": "Any",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "trigger_5",
            "label": "Emergency PDU session establishment",
            "type": "trigger",
            "properties": {
              "trigger_type": "UE initiated",
              "conditions": "Upper layers request to establish emergency PDU session",
              "related_states": "Any",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "trigger_6",
            "label": "Deregistration completion and Tsorcm timers stopped",
            "type": "trigger",
            "properties": {
              "trigger_type": "UE initiated",
              "conditions": "After network initiated deregistration procedure completion and release of NAS signaling connection and Tsorcm timers have stopped",
              "related_states": "Any",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "trigger_7",
            "label": "Deregistration completion",
            "type": "trigger",
            "properties": {
              "trigger_type": "UE initiated",
              "conditions": "After deregistration procedure completion and release of NAS signaling connection",
              "related_states": "Any",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "state_1",
            "label": "5GMM-CONNECTED to 5GMM-IDLE",
            "type": "state",
            "properties": {
              "current_state": "5GMM-CONNECTED",
              "conditions": "RRC inactive indication",
              "next_states": "5GMM-IDLE",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "state_2",
            "label": "EMMDEREGISTERED",
            "type": "state",
            "properties": {
              "current_state": "EMMDEREGISTERED",
              "conditions": "UE was previously registered in S1 mode",
              "next_states": "N/A",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "action_1",
            "label": "Provide GUAMI mapped from 4GGUTI",
            "type": "action",
            "properties": {
              "actor": "UE NAS",
              "prerequisites": "UE has a 4GGUTI",
              "outcomes": "Lower layers receive GUAMI mapped from 4GGUTI",
              "error_cases": "Mapping fails",
              "spec_references": "24501-j11.md, 23.003"
            }
          },
          {
            "id": "action_2",
            "label": "Provide 5GSTMSI",
            "type": "action",
            "properties": {
              "actor": "UE NAS",
              "prerequisites": "UE has a 5GSTMSI",
              "outcomes": "Lower layers receive 5GSTMSI, but not GUAMI",
              "error_cases": "N/A",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "action_3",
            "label": "Provide GUAMI of 5GGUTI",
            "type": "action",
            "properties": {
              "actor": "UE NAS",
              "prerequisites": "UE has selected a 5GGUTI",
              "outcomes": "Lower layers receive GUAMI, but not 5GSTMSI",
              "error_cases": "N/A",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "message_1",
            "label": "REGISTRATION REQUEST",
            "type": "message",
            "properties": {
              "message_type": "REGISTRATION REQUEST",
              "direction": "UE→Network",
              "mandatory_ies": "Registration Type, 5GMM Capability",
              "optional_ies": "Requested NSSAI, UE security capabilities",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "message_2",
            "label": "REGISTRATION ACCEPT",
            "type": "message",
            "properties": {
              "message_type": "REGISTRATION ACCEPT",
              "direction": "Network→UE",
              "mandatory_ies": "5G-GUTI",
              "optional_ies": "PLMN list, T3550 value",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "message_3",
            "label": "REGISTRATION REJECT",
            "type": "message",
            "properties": {
              "message_type": "REGISTRATION REJECT",
              "direction": "Network→UE",
              "mandatory_ies": "5GMM cause",
              "optional_ies": "T3550 value",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "flow_1",
            "label": "Establish N1 NAS signaling connection",
            "type": "flow",
            "properties": {
              "prerequisites": "Initial Registration triggered",
              "outcomes": "N1 NAS signaling connection established",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "flow_2",
            "label": "Release N1 NAS signaling connection",
            "type": "flow",
            "properties": {
              "prerequisites": "Registration completed or rejected",
              "outcomes": "N1 NAS signaling connection released",
              "spec_references": "24501-j11.md"
            }
          }
        ],
        "edges": [
          {
            "id": "edge_1",
            "source": "trigger_1",
            "target": "flow_1",
            "label": "Triggers",
            "type": "trigger",
            "properties": {}
          },
          {
            "id": "edge_2",
            "source": "trigger_2",
            "target": "flow_1",
            "label": "Triggers",
            "type": "trigger",
            "properties": {}
          },
          {
            "id": "edge_3",
            "source": "trigger_3",
            "target": "flow_1",
            "label": "Triggers",
            "type": "trigger",
            "properties": {}
          },
          {
            "id": "edge_4",
            "source": "trigger_4",
            "target": "flow_1",
            "label": "Triggers",
            "type": "trigger",
            "properties": {}
          },
          {
            "id": "edge_5",
            "source": "trigger_5",
            "target": "flow_1",
            "label": "Triggers",
            "type": "trigger",
            "properties": {}
          },
          {
            "id": "edge_6",
            "source": "trigger_6",
            "target": "flow_1",
            "label": "Triggers",
            "type": "trigger",
            "properties": {}
          },
          {
            "id": "edge_7",
            "source": "trigger_7",
            "target": "flow_1",
            "label": "Triggers",
            "type": "trigger",
            "properties": {}
          },
          {
            "id": "edge_8",
            "source": "state_1",
            "target": "flow_1",
            "label": "State Change",
            "type": "state_change",
            "properties": {}
          },
          {
            "id": "edge_9",
            "source": "state_2",
            "target": "flow_1",
            "label": "State Change",
            "type": "state_change",
            "properties": {}
          },
          {
            "id": "edge_10",
            "source": "flow_1",
            "target": "message_1",
            "label": "Execution Flow",
            "type": "execution",
            "properties": {
              "sequence_number": 1
            }
          },
          {
            "id": "edge_11",
            "source": "message_1",
            "target": "message_2",
            "label": "Message Flow",
            "type": "message_flow",
            "properties": {
              "sequence_number": 2
            }
          },
          {
            "id": "edge_12",
            "source": "message_1",
            "target": "message_3",
            "label": "Message Flow",
            "type": "message_flow",
            "properties": {
              "sequence_number": 2
            }
          },
          {
            "id": "edge_13",
            "source": "message_2",
            "target": "flow_2",
            "label": "Execution Flow",
            "type": "execution",
            "properties": {
              "sequence_number": 3
            }
          },
          {
            "id": "edge_14",
            "source": "message_3",
            "target": "flow_2",
            "label": "Execution Flow",
            "type": "execution",
            "properties": {
              "sequence_number": 3
            }
          }
        ],
        "metadata": {
          "procedure_id": "Initial Registration",
          "doc_id": "24501-j11.md",
          "spec_sections": [
            "Section 5.5.1.2.7",
            "Section 5.3.1.3",
            "Section 5.3.1.1",
            "Section 5.5.2.3.2",
            "Section 5.5.2.2.6"
          ],
          "category": "Registration Procedures",
          "sub_category": null,
          "procedure_name": "Initial Registration",
          "total_nodes": 17,
          "total_edges": 14
        }
      },
    'json2-a2': {
        "nodes": [
          {
            "id": "Trigger1",
            "label": "Trigger: Exceptional Event Data Reporting",
            "type": "Trigger",
            "properties": {
              "trigger_type": "UE initiated",
              "conditions": "UE in NBN1 mode, request from upper layers to transmit user data related to an exceptional event, UE allowed to use exception data reporting, timer T3346 is not running for MO exception data, even if timer T3502 or timer T3511 is running",
              "related_states": [],
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "Trigger2",
            "label": "Trigger: RAN Timing Synchronization Status Change",
            "type": "Trigger",
            "properties": {
              "trigger_type": "UE initiated",
              "conditions": "UE supports the reconnection to the network due to RAN timing synchronization status change, receives an indication of a change in the RAN timing synchronization status even if timer T3502 is running",
              "related_states": [],
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "Trigger3",
            "label": "Trigger: RRC Inactive Indication",
            "type": "Trigger",
            "properties": {
              "trigger_type": "UE initiated",
              "conditions": "5GMM-CONNECTED mode with RRC inactive indication",
              "related_states": [],
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "Action1",
            "label": "Action: Initiate Registration Procedure",
            "type": "Action",
            "properties": {
              "actor": "UE",
              "prerequisites": "One of the triggers is met",
              "outcomes": "Registration procedure is initiated",
              "error_cases": "Network rejects the registration",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "Action2",
            "label": "Action: Transition to RRC_CONNECTED and Include Uplink Data Status",
            "type": "Action",
            "properties": {
              "actor": "UE",
              "prerequisites": "UE requests lower layers to transition to RRC_CONNECTED state at initiation of registration procedure",
              "outcomes": "UE enters 5GMMIDLE mode, continues registration, includes Uplink data status IE if conditions are met",
              "error_cases": "Transition to RRC_CONNECTED fails",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "Flow1",
            "label": "Flow: Establish N1 NAS Signalling Connection",
            "type": "Flow",
            "properties": {}
          },
          {
            "id": "Flow2",
            "label": "Flow: Send REGISTRATION REQUEST Message",
            "type": "Flow",
            "properties": {}
          },
          {
            "id": "Flow3",
            "label": "Flow: Receive REGISTRATION ACCEPT or REJECT Message",
            "type": "Flow",
            "properties": {}
          },
          {
            "id": "Flow4",
            "label": "Flow: Release N1 NAS Signalling Connection",
            "type": "Flow",
            "properties": {}
          },
          {
            "id": "Message1",
            "label": "Message: REGISTRATION REQUEST",
            "type": "Message",
            "properties": {
              "message_type": "REGISTRATION REQUEST",
              "direction": "UE→Network",
              "mandatory_ies": "5GMM capability, UE security capabilities, Requested NSSAI",
              "optional_ies": "UE request type, Uplink data status",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "Message2",
            "label": "Message: REGISTRATION ACCEPT",
            "type": "Message",
            "properties": {
              "message_type": "REGISTRATION ACCEPT",
              "direction": "Network→UE",
              "mandatory_ies": "Registration result",
              "optional_ies": "5G-GUTI, Allowed NSSAI",
              "spec_references": "24501-j11.md"
            }
          },
          {
            "id": "Message3",
            "label": "Message: REGISTRATION REJECT",
            "type": "Message",
            "properties": {
              "message_type": "REGISTRATION REJECT",
              "direction": "Network→UE",
              "mandatory_ies": "5GMM cause",
              "optional_ies": "None",
              "spec_references": "24501-j11.md"
            }
          }
        ],
        "edges": [
          {
            "id": "Edge1",
            "source": "Trigger1",
            "target": "Action1",
            "label": "Triggers Action",
            "type": "Trigger_Action",
            "properties": {}
          },
          {
            "id": "Edge2",
            "source": "Trigger2",
            "target": "Action1",
            "label": "Triggers Action",
            "type": "Trigger_Action",
            "properties": {}
          },
          {
            "id": "Edge3",
            "source": "Trigger3",
            "target": "Action1",
            "label": "Triggers Action",
            "type": "Trigger_Action",
            "properties": {}
          },
          {
            "id": "Edge4",
            "source": "Action1",
            "target": "Action2",
            "label": "Conditional Action",
            "type": "Action_Action",
            "properties": {
              "condition": "UE requests lower layers to transition to RRC_CONNECTED state"
            }
          },
          {
            "id": "Edge5",
            "source": "Action1",
            "target": "Flow1",
            "label": "Initiates Flow",
            "type": "Action_Flow",
            "properties": {}
          },
          {
            "id": "Edge6",
            "source": "Flow1",
            "target": "Flow2",
            "label": "Next Step",
            "type": "Flow_Flow",
            "properties": {
              "sequence_number": 1
            }
          },
          {
            "id": "Edge7",
            "source": "Flow2",
            "target": "Message1",
            "label": "Sends Message",
            "type": "Flow_Message",
            "properties": {}
          },
          {
            "id": "Edge8",
            "source": "Message1",
            "target": "Flow3",
            "label": "Causes Next Step",
            "type": "Message_Flow",
            "properties": {}
          },
          {
            "id": "Edge9",
            "source": "Flow3",
            "target": "Message2",
            "label": "Receives Message",
            "type": "Flow_Message",
            "properties": {}
          },
          {
            "id": "Edge10",
            "source": "Flow3",
            "target": "Message3",
            "label": "Receives Message",
            "type": "Flow_Message",
            "properties": {}
          },
          {
            "id": "Edge11",
            "source": "Message2",
            "target": "Flow4",
            "label": "Triggers Flow",
            "type": "Message_Flow",
            "properties": {
              "success_criteria": "Registration Accepted"
            }
          },
          {
            "id": "Edge12",
            "source": "Message3",
            "target": "Flow4",
            "label": "Triggers Flow",
            "type": "Message_Flow",
            "properties": {
              "failure_handling": "Registration Rejected"
            }
          },
          {
            "id": "Edge13",
            "source": "Flow4",
            "target": "Action1",
            "label": "Feedback Loop",
            "type": "Flow_Action",
            "properties": {
              "condition": "Registration Rejected",
              "retry_behavior": "Retry with modifications or backoff"
            }
          }
        ],
        "metadata": {
          "procedure_id": "PeriodicRegistration",
          "doc_id": "24501-j11.md",
          "spec_sections": [
            "5.2.3.2.3",
            "5.3.1.4"
          ],
          "category": "Registration Procedures",
          "sub_category": "Periodic Registration Update",
          "procedure_name": "Periodic Registration",
          "total_nodes": 12,
          "total_edges": 13
        }
      }
};

async function toggleQuery(containerId, buttonElement) {
    const container = document.getElementById(containerId);
    const queryText = container.querySelector('.query-text');
    const allContainers = document.querySelectorAll('.query-container');
    const allButtons = document.querySelectorAll('.query-button');
    
    const isCurrentlyHidden = container.style.display === 'none' || container.style.display === '';
    
    // First hide all containers and reset all button text
    allContainers.forEach(c => {
        c.style.display = 'none';
    });
    allButtons.forEach(b => {
        b.textContent = b.textContent.replace('Hide', 'Show');
    });
    
    if (isCurrentlyHidden) {
        try {
            const content = contentData[containerId];
            
            // Handle JSON content
            if (containerId.includes('json')) {
                container.classList.add('json-content');
                const jsonString = JSON.stringify(content, null, 2);
                // Add syntax highlighting
                const highlightedJson = jsonString.replace(
                    /(".*?"):/g, '<span class="key">$1</span>:'
                ).replace(
                    /: (".*?")([,\n]|$)/g, ': <span class="string">$1</span>$2'
                ).replace(
                    /\b(true|false)\b/g, '<span class="boolean">$1</span>'
                ).replace(
                    /\b(null)\b/g, '<span class="null">$1</span>'
                ).replace(
                    /\b(\d+)\b/g, '<span class="number">$1</span>'
                );
                queryText.innerHTML = highlightedJson;
            } else {
                container.classList.remove('json-content');
                queryText.textContent = content;
            }
            
            container.style.display = 'block';
            buttonElement.textContent = buttonElement.textContent.replace('Show', 'Hide');
        } catch (error) {
            console.error('Error displaying content:', error);
            queryText.textContent = 'Error loading content.';
            container.style.display = 'block';
        }
    } else {
        container.style.display = 'none';
        buttonElement.textContent = buttonElement.textContent.replace('Hide', 'Show');
    }
} 

// Add event listener for when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, script running');
}); 