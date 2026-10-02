class OperationModel {
  final int? id;
  final String directiveName;
  final String details;
  final String domainType;
  final bool isActive;
  final String executionDate;

  OperationModel({
    this.id,
    required this.directiveName,
    required this.details,
    required this.domainType,
    required this.isActive,
    required this.executionDate,
  });

  factory OperationModel.fromJson(Map<String, dynamic> json) {
    return OperationModel(
      id: json['id'],
      directiveName: json['directive_name'] ?? '',
      details: json['details'] ?? '',
      domainType: json['domain_type'] ?? 'Military',
      isActive: json['is_active'] ?? true,
      executionDate: json['execution_date'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      if (id != null) 'id': id,
      'directive_name': directiveName,
      'details': details,
      'domain_type': domainType,
      'is_active': isActive,
      'execution_date': executionDate,
    };
  }
}
